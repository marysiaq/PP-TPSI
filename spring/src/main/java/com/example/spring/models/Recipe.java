package com.example.spring.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @NotEmpty
    @Size(min=3, max=200)
    private String name;
    @NotEmpty
    private String preparation;
    @Size(min=1, max=30)
    private List<Ingredient> ingredients;
    @Min(5)@Max(240)
    private int preparationTime;//minutes
    @NotNull
    private Difficulty difficulty;
    @Size(min=1, max=8)
    private Set<Category> categories;
    private boolean forVegans;
    @Min(1)@Max(8)
    private int portions;
    //@NotNull
    //private User author;
    private LocalDate dateAdded;




}
