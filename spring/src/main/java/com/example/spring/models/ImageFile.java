package com.example.spring.models;

import com.example.spring.services.ImageFileService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter@Setter@AllArgsConstructor@NoArgsConstructor
@Entity
public class ImageFile {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @NotNull
    private String photoName;
    @Lob
    //@Column(columnDefinition="blob")
    private byte[] photoContent;

    public ImageFile (String photoName,byte[] photoContent){
        this.photoName=photoName;
        this.photoContent=photoContent;
    }
}
