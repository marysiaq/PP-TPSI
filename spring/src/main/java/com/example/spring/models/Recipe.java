package com.example.spring.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    @Size(min=3, max=200, message = "Długość nazwy musi wynosić od 3 do 200 znaków!")
    private String name;
    @NotEmpty
    @Size(min=3, max=2000,message = "Ilość znaków musi wynosić od 3 do 2000!")
    private String preparation;
    @Size(min=1, max=30,message = "Ilość składników musi wynosić od 1 do 30!")
    @OneToMany
    private List<Ingredient> ingredients;
    @Min(value=5 ,message ="Czas przygotowania musi wynosić co najmniej 5 min!")@Max(value=240,message ="Czas przygotowania musi wynosić co najwyżej 240 min!")
    @JoinColumn(name="preparation_time")
    private int preparationTime;//minutes
    @NotNull(message = "Należy wybrać poziom trudności!")
    @ManyToOne
    private Difficulty difficulty;
    @Size(min=1, max=8,message = "Należy wybrać od 1 do 8 kategorii!")
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Category> categories;
    @JoinColumn(name="for_Vegans")
    private boolean forVegans;
    @Min(1)@Max(8)
    private int portions;
    //@NotNull
    //private User author;
    @JoinColumn(name="fdate_Added")
    @DateTimeFormat(iso=DateTimeFormat.ISO.DATE)
    private LocalDate dateAdded;

    @OneToOne
    private ImageFile photo;

    public Recipe(Long id,String name, String preparation, List<Ingredient> ingredients, int preparationTime, Difficulty difficulty, Set<Category> categories, boolean forVegans, int portions , LocalDate dateAdded){
        this.id = id;
        this.name = name;
        this.preparation = preparation;
        this.ingredients = ingredients;
        this.preparationTime = preparationTime;
        this.difficulty = difficulty;
        this.categories = categories;
        this.forVegans = forVegans;
        this.portions = portions;
        this.dateAdded = dateAdded;
    }




}
