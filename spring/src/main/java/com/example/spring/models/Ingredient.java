package com.example.spring.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Entity @Table(name = "ingredients")
public class Ingredient {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Nazwa nie może być pusta!")
    private String name;
    @NotNull(message = "Należy wybrać jednostkę!")
    @ManyToOne
    private Unit unit;
    @DecimalMin(value = "0.1", message = "Ilość powinna wynosić co najmniej 0.1!")
    private float amount;
    public Ingredient(String name, Unit unit, float amount) {
        this.name = name;
        this.unit = unit;
        this.amount = amount;
    }
}
