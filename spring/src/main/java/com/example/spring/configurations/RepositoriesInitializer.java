package com.example.spring.configurations;

import com.example.spring.models.*;
import com.example.spring.repositories.*;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class RepositoriesInitializer {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private DifficultyRepository difficultyRepository;
    @Autowired
    private IngredientRepository ingredientRepository;
    @Autowired
    private RecipeReposiory recipeReposiory;
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Bean
    InitializingBean init (){
        return () -> {
            if(roleRepository.findAll().isEmpty()){
                Role r1 = new Role(ERole.ROLE_ADMIN);
                Role r2 = new Role(ERole.ROLE_USER);

                roleRepository.save(r1);
                roleRepository.save(r2);
            }
            if(userRepository.findAll().isEmpty()){
                User admin = new User("Admin","admin@gmail.com",encoder.encode("Admin@123"));
                Set<Role> rolesadmin = new HashSet<>();
                rolesadmin.add(roleRepository.findByName(ERole.ROLE_ADMIN).get());
                admin.setRoles(rolesadmin);
                userRepository.save(admin);
            }

            if(recipeReposiory.findAll().isEmpty()) {
                Category c1 = new Category("Śniadanie");
                Category c2 = new Category("Obiad");
                Category c3 = new Category("Kolacja");
                Category c4 = new Category("Bez mięsne");
                if(categoryRepository.findAll().isEmpty()) {
                    categoryRepository.save(c1);
                    categoryRepository.save(c2);
                    categoryRepository.save(c3);
                    categoryRepository.save(c4);
                }


                Difficulty d1 = new Difficulty("łatwy");
                Difficulty d2 = new Difficulty("średni");
                Difficulty d3 = new Difficulty("trudny");
                if(difficultyRepository.findAll().isEmpty()) {
                    difficultyRepository.save(d1);
                    difficultyRepository.save(d2);
                    difficultyRepository.save(d3);
                }



                Unit u1 = new Unit("szt.");
                Unit u2 = new Unit("g");
                Unit u3 = new Unit("ml");
                if(unitRepository.findAll().isEmpty()) {
                    unitRepository.save(u1);
                    unitRepository.save(u2);
                    unitRepository.save(u3);
                }


                Ingredient i1 = new Ingredient("Cebula", u1, 1);
                Ingredient i2 = new Ingredient("Jajko", u1, 2);
                Ingredient i3 = new Ingredient("Olej", u3, 10);

                Ingredient i4 = new Ingredient("Cebula", u1, 1);
                Ingredient i5 = new Ingredient("Jajko", u1, 2);


                Ingredient i6 = new Ingredient("Cebula", u1, 1);
                Ingredient i7 = new Ingredient("Jajko", u1, 5);

                if(ingredientRepository.findAll().isEmpty()) {
                    ingredientRepository.save(i1);
                    ingredientRepository.save(i2);
                    ingredientRepository.save(i3);
                    ingredientRepository.save(i4);
                    ingredientRepository.save(i5);
                    ingredientRepository.save(i6);
                    ingredientRepository.save(i7);
                }

                List<Ingredient> i = new ArrayList<>();
                i.add(i1);
                i.add(i2);
                i.add(i3);
                List<Ingredient> in = new ArrayList<>();
                in.add(i4);
                in.add(i5);
                List<Ingredient> ing = new ArrayList<>();
                ing.add(i6);
                ing.add(i7);

                Set<Category> set = new HashSet<Category>();
                set.add(c1);
                set.add(c4);
                LocalDate ld1 = LocalDate.of(2022, 2, 21);
                Recipe r1 = new Recipe(1L, "Jajecznica", "Na patelnię wlać olej, poczekać aż się rozgrzeje, następnie wrzucic pokrojną cebulę oraz wybić jajka", i, 15, d1, set, false, 1, ld1);
                Recipe r2 = new Recipe(2L, "Jajecznica2", "Na patelnię wlać olej, poczekać aż się rozgrzeje, następnie wrzucic pokrojną cebulę oraz wybić jajka", in, 35, d1, set, false, 2, ld1);
                Recipe r3 = new Recipe(3L, "Jajecznica3", "Na patelnię wlać olej, poczekać aż się rozgrzeje, następnie wrzucic pokrojną cebulę oraz wybić jajka", ing, 12, d1, set, false, 3, ld1);

                recipeReposiory.save(r1);
                recipeReposiory.save(r2);
                recipeReposiory.save(r3);

            }
        };
    }

}
