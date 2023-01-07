package DTO;

import com.example.spring.models.Category;
import com.example.spring.models.Difficulty;
import com.example.spring.models.Ingredient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter@Setter@NoArgsConstructor@AllArgsConstructor
public class RecipeDTO {
    private Long id;
    private String name;
    private String preparation;
    private List<Long> ingredients_ids;
    private int preparationTime;//minutes
    private Integer difficulty_id;
    private Set<Integer> categories_ids;
    private boolean forVegans;
    private int portions;
    //@NotNull
    //private User author_id;
}
