package com.example.spring.services;

import com.example.spring.models.Recipe;
import com.lowagie.text.DocumentException;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface PdfService {
    public ByteArrayOutputStream generate(Recipe recipe)throws DocumentException, IOException;
}
