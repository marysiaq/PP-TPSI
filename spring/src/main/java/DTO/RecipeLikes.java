package DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter@Setter@NoArgsConstructor@AllArgsConstructor
public class RecipeLikes {
    Long recipeId;
    String recipeName;
    Long amount;
}
