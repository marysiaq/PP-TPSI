package com.example.spring.servicesimplementations;

import com.example.spring.models.ImageFile;
import com.example.spring.repositories.ImageFileRepository;
import com.example.spring.repositories.RecipeReposiory;
import com.example.spring.services.ImageFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
@Service
public class ImageFileServiceImplementation  implements ImageFileService {
    @Autowired
    private ImageFileRepository imageFileRepository;

    @Autowired
    private RecipeReposiory recipeReposiory;
    @Override
    public Long createFileReturnId(ImageFile img) {
        return imageFileRepository.save(img).getId();
    }

    @Override
    public ImageFile getImageById(Long id) {
        return imageFileRepository.findById(id).orElseThrow();
    }

    @Override
    public void updateImage(ImageFile img) {
        imageFileRepository.save(img);
    }

    @Override
    public void deleteImageById(Long id) {
        var recipe = recipeReposiory.findByPhoto(imageFileRepository.findById(id).orElseThrow());
        if(recipe!=null){
            recipe.setPhoto(null);
            recipeReposiory.save(recipe);
        }
        imageFileRepository.deleteById(id);
    }
}
