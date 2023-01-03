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
    @Size(min=3, max=200)
    private String name;
    @NotEmpty
    @Size(min=3, max=2000)
    private String preparation;
    @Size(min=1, max=30)
    @OneToMany
    private List<Ingredient> ingredients;
    @Min(5)@Max(240)
    @JoinColumn(name="preparation_time")
    private int preparationTime;//minutes
    @NotNull
    @ManyToOne
    private Difficulty difficulty;
    @Size(min=1, max=8)
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




}
