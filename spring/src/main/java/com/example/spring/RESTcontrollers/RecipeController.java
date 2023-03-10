package com.example.spring.RESTcontrollers;

import DTO.*;
import com.example.spring.exceptions.RecipeNotFoundException;
import com.example.spring.models.Category;
import com.example.spring.models.Difficulty;
import com.example.spring.models.ImageFile;
import com.example.spring.models.Recipe;
import com.example.spring.services.*;
import com.lowagie.text.DocumentException;
import io.github.classgraph.Resource;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/recipe")
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

    @Autowired
    private PdfService pdfService;

    private final ModelMapper modelMapper = new ModelMapper();
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
    public  ResponseEntity deleteImage(@PathVariable long id) {

        imageFileService.deleteImageById(id);
        return new ResponseEntity(new EmptyJSON("ok"),  HttpStatus.OK);
    }
    @PostMapping("/like")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity likeRecipe(@RequestBody LikeData likeData) throws RecipeNotFoundException {
        likeService.addLike(likeData.getRecipe_id(),likeData.getUser_id());
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PostMapping("/findlike")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity findLike(@RequestBody LikeData likeData) throws RecipeNotFoundException {
        return new ResponseEntity<>(likeService.findLike(likeData.getRecipe_id(),likeData.getUser_id()),HttpStatus.OK);

    }
    @PostMapping("/unlike")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity unlikeRecipe(@RequestBody LikeData likeData) throws RecipeNotFoundException {
        likeService.unlikeRecipe(likeData.getRecipe_id(),likeData.getUser_id());
        return new ResponseEntity<>(HttpStatus.OK);

    }
    @GetMapping("/getlikedrecipes/{user_id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity getlLikedRecipes(@PathVariable Long user_id) throws RecipeNotFoundException {
        var dto =likeService.getLikedRecipes(user_id).stream().map(e -> {
            return modelMapper.map(e,RecipeDTO.class);
        }).collect(Collectors.toList());;
        return new ResponseEntity<>(dto,HttpStatus.OK);

    }

    @GetMapping("/pdf/{id}")
    public ResponseEntity<byte[]> getPdf(@PathVariable Long id) throws RecipeNotFoundException, DocumentException, IOException {
       //
       // return pdf;
        var pdf = pdfService.generate(recipeService.getRecipeById(id)).toByteArray();


        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.parseMediaType("application/pdf"));
        header.setContentLength(pdf.length);
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=salaryslip.pdf");
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");

        return new ResponseEntity<>(pdf, header, HttpStatus.OK);

    }


}
