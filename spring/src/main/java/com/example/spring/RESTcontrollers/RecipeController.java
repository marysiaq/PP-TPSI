package com.example.spring.RESTcontrollers;

import DTO.*;
import com.example.spring.exceptions.RecipeNotFoundException;
import com.example.spring.models.Category;
import com.example.spring.models.Difficulty;
import com.example.spring.models.ImageFile;
import com.example.spring.models.Recipe;
import com.example.spring.services.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private DifficultyService difficultyService;
    @Autowired
    private LikeService likeService;
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private ImageFileService imageFileService;

    private final ModelMapper modelMapper = new ModelMapper();
    @PostMapping("/create")
    public ResponseEntity<Object> createRecipe (@Valid @RequestBody Recipe recipe, BindingResult result){
        if(result.hasErrors()){
            var List = result.getFieldErrors().stream().
                    map(f->new CustomFieldError(f.getField(), f.getDefaultMessage())).
                    collect(Collectors.toList());
            FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
            fieldErrorResponse.setFieldErrors(List);

            return new ResponseEntity(fieldErrorResponse, HttpStatus.NOT_ACCEPTABLE);
        }

        recipeService.createRecipe(recipe);

        return new ResponseEntity(new EmptyJSON("ok"),  HttpStatus.OK);
    }
    @PutMapping("/update")
    public  ResponseEntity updateRecipe(@Valid @RequestBody Recipe recipe, BindingResult result) throws RecipeNotFoundException {
        if(result.hasErrors()){
            var List = result.getFieldErrors().stream().
                    map(f->new CustomFieldError(f.getField(), f.getDefaultMessage())).
                    collect(Collectors.toList());
            FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
            fieldErrorResponse.setFieldErrors(List);

            return new ResponseEntity(fieldErrorResponse, HttpStatus.NOT_ACCEPTABLE);
        }
        recipeService.updateRecipe(recipe);
        return new ResponseEntity(HttpStatus.OK);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/getranking")
    public ResponseEntity  getRanking() {
        List<RecipeLikes> ranking = likeService.getRanking();
        return new ResponseEntity<>(new Ranking(ranking),HttpStatus.OK);
    }
    @GetMapping(value = "/getrecipelikes/{id}")
    public  ResponseEntity getReceipeLikes(@PathVariable long id){
        return  new ResponseEntity<>(likeService.getRecipeLikes(id), HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public  ResponseEntity deleteRecipe(@PathVariable long id) throws RecipeNotFoundException {
        recipeService.deleteRecipeById(id);
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("/get/{id}")
    public Recipe getRecipeById(@PathVariable long id) throws RecipeNotFoundException {
        return recipeService.getRecipeById(id);
    }
    @GetMapping("/list")
    public ResponseEntity<Object> getList(@RequestParam(required = false) Optional<String> phrase, @RequestParam(required = false) Optional<Integer> min, @RequestParam(required = false) Optional<Integer> max, @RequestParam(required = false) Optional<List<Integer>> categoriesIds,@RequestParam(required = false) Optional<Integer> difficultyId){
        var recipes = recipeService.getRecipes();
        var dtoList =recipes.stream().map(e -> {
            return modelMapper.map(e,RecipeDTO.class);
        }).collect(Collectors.toList());

        if(phrase.isPresent()&&phrase.get()!=""){
            var recipes1 = recipeService.getRecipesPhraseFilter(phrase.get());
            var dtoList1 =recipes1.stream().map(e -> {
                return modelMapper.map(e,RecipeDTO.class);
            }).collect(Collectors.toList());
            dtoList.retainAll(dtoList1);
        }
        if(categoriesIds.isPresent()&&categoriesIds.get().size()!=0){
            var recipes1 = recipeService.getRecipesCategoriesFilter(categoriesIds.get());
            var dtoList1 =recipes1.stream().map(e -> {
                return modelMapper.map(e,RecipeDTO.class);
            }).collect(Collectors.toList());
            dtoList.retainAll(dtoList1);
        }

        if(min.isPresent()&&max.isPresent()&&!min.isEmpty()&&!max.isEmpty()){
            var recipes1 = recipeService.getRecipesPreparationTimeFilter(min.get(),max.get());
            var dtoList1 =recipes1.stream().map(e -> {
                return modelMapper.map(e,RecipeDTO.class);
            }).collect(Collectors.toList());
            dtoList.retainAll(dtoList1);
        }
        if(difficultyId.isPresent()&&!difficultyId.isEmpty()){
            var recipes1 = recipeService.getRecipesDifficultyFilter(difficultyId.get());
            var dtoList1 =recipes1.stream().map(e -> {
                return modelMapper.map(e,RecipeDTO.class);
            }).collect(Collectors.toList());
            dtoList.retainAll(dtoList1);
        }
        return new ResponseEntity(dtoList, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping("/difficulty")
    public List<Difficulty> getDifficultyLevels(){
        return  difficultyService.getDifficultyLevels();
    }

    @PostMapping(value = "/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam MultipartFile file) throws IOException {
        ImageFile img = new ImageFile(file.getOriginalFilename(),file.getBytes());
        var id = imageFileService.createFileReturnId(new ImageFile(null,file.getOriginalFilename(),file.getBytes()));
        IdClass idClass = new IdClass(id);
        return new ResponseEntity(idClass,  HttpStatus.OK);

    }
    @GetMapping("/getFile/{id}" )
    public  ImageFile getImage(@PathVariable long id){
        return imageFileService.getImageById(id);
    }

    @DeleteMapping(value="/deleteFile/{id}")
    public  ResponseEntity deleteImage(@PathVariable long id) {

        imageFileService.deleteImageById(id);
        return new ResponseEntity(new EmptyJSON("ok"),  HttpStatus.OK);
    }
    @PostMapping("/like/{id}")
    public ResponseEntity likeRecipe(@PathVariable Long id){
        likeService.addLike(id);
        return new ResponseEntity<>(HttpStatus.OK);

    }

}
