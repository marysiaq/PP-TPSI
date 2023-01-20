package DTO;

import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter @Setter@AllArgsConstructor@NoArgsConstructor
public class Ranking {
    private List<RecipeLikes> ranking;
}
