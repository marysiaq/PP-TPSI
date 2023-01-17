package com.example.spring.repositories;

import com.example.spring.models.Difficulty;
import com.example.spring.models.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageFileRepository extends JpaRepository<ImageFile,Long> {

}
