package com.example.spring.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.NotNull;

@Getter@Setter@AllArgsConstructor@NoArgsConstructor
@Entity
public class ImageFile {

    @Id
    private Long id;
    @NotNull
    private String photoName;
    @Lob
    @Column(columnDefinition="blob")
    private byte[] photoContent;
}
