package com.example.spring.services;

import com.example.spring.models.ImageFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageFileService {
    public abstract Long createFileReturnId(ImageFile img) ;
    public abstract ImageFile getImageById(Long id);
    public abstract void updateImage(ImageFile img);
    public abstract void deleteImageById(Long id);


}
