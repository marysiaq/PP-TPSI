package com.example.spring.servicesimplementations;

import com.example.spring.models.Recipe;
import com.example.spring.services.PdfService;
import com.lowagie.text.DocumentException;
import com.lowagie.text.pdf.BaseFont;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfServiceImplementation implements PdfService {
    @Autowired
    private TemplateEngine templateEngine;
    private String parseThymeleafTemplate(Recipe recipe) {
        var thymeleafCtx = new Context();
        thymeleafCtx.setVariable("nazwa", recipe.getName());
        thymeleafCtx.setVariable("skladniki", recipe.getIngredients());
        thymeleafCtx.setVariable("przygotowanie", recipe.getPreparation());
        return templateEngine.process("pdf", thymeleafCtx);
    }

    public ByteArrayOutputStream generatePdf(String html) throws DocumentException, IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream ();

        ITextRenderer renderer = new ITextRenderer();//"font/dejavu-sans/DejaVuSans.ttf"
        renderer.getFontResolver().addFont("C:/Users/bm01/Desktop/dejavu-fonts-ttf-2.37/ttf/DejaVuSans.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        renderer.setDocumentFromString(html);
        renderer.layout();
        renderer.createPDF(byteArrayOutputStream);

        byteArrayOutputStream.close();
        return byteArrayOutputStream;
    }

    public ByteArrayOutputStream generate (Recipe recipe) throws DocumentException, IOException {
        return generatePdf(parseThymeleafTemplate(recipe));
    }


}
