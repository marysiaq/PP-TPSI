package com.example.spring.configurations;

import com.example.spring.models.*;
import com.example.spring.repositories.*;
import com.example.spring.services.LikeService;
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
    private LikeRepository likeRepository;

    @Autowired
    private LikeService likeService;
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
                User admin = new User("admin","admin@email.com",encoder.encode("admin@123"));
                Set<Role> rolesadmin = new HashSet<>();
                admin.setEnabled(true);
                rolesadmin.add(roleRepository.findByName(ERole.ROLE_ADMIN).get());
                admin.setRoles(rolesadmin);
                userRepository.save(admin);

                User adminuser = new User("AdminUser","adminuser@email.com",encoder.encode("adminuser@123"));
                Set<Role> rolesadminuser = new HashSet<>();
                adminuser.setEnabled(true);
                rolesadmin.add(roleRepository.findByName(ERole.ROLE_ADMIN).get());
                rolesadmin.add(roleRepository.findByName(ERole.ROLE_USER).get());
                adminuser.setRoles(rolesadminuser);
                userRepository.save(adminuser);


                User user1 = new User("user1","user1@email.com",encoder.encode("user1"));
                Set<Role> rolesuser1 = new HashSet<>();
                user1.setEnabled(true);
                rolesuser1.add(roleRepository.findByName(ERole.ROLE_USER).get());
                user1.setRoles(rolesuser1);
                userRepository.save(user1);


                User user2 = new User("User2","user2@email.com",encoder.encode("user2"));
                Set<Role> rolesuser2 = new HashSet<>();
                rolesuser2 .add(roleRepository.findByName(ERole.ROLE_USER).get());
                user2.setRoles(rolesuser2);
                user2.setEnabled(true);
                userRepository.save(user2);

                User user3 = new User("User3","user3@email.com",encoder.encode("user3"));
                Set<Role> rolesuser3 = new HashSet<>();
                rolesuser3.add(roleRepository.findByName(ERole.ROLE_USER).get());
                user3.setRoles(rolesuser3);
                user3.setEnabled(true);
                userRepository.save(user3);




            }
            Difficulty d1 = new Difficulty(1,"??atwy");
            Difficulty d2 = new Difficulty(2,"??redni");
            Difficulty d3 = new Difficulty(3,"trudny");
            if(difficultyRepository.findAll().isEmpty()) {
                difficultyRepository.save(d1);
                difficultyRepository.save(d2);
                difficultyRepository.save(d3);
            }

            Unit u1 = new Unit(1,"szt.");
            Unit u2 = new Unit(2,"g");
            Unit u3 = new Unit(3,"ml");
            Unit u4 = new Unit(4,"??y??ka");
            Unit u5 = new Unit(5,"szczypta");
            Unit u6 = new Unit(6,"??y??eczka");
            if(unitRepository.findAll().isEmpty()) {
                unitRepository.save(u1);
                unitRepository.save(u2);
                unitRepository.save(u3);
                unitRepository.save(u4);
                unitRepository.save(u5);
                unitRepository.save(u6);
            }

            Category c1 = new Category(1,"??niadanie");
            Category c2 = new Category(2,"Obiad");
            Category c3 = new Category(3,"Kolacja");
            Category c4 = new Category(4,"Bez mi??sne");
            Category c5 = new Category(5,"S??odkie");
            if(categoryRepository.findAll().isEmpty()) {
                categoryRepository.save(c1);
                categoryRepository.save(c2);
                categoryRepository.save(c3);
                categoryRepository.save(c4);
                categoryRepository.save(c5);
            }



            if(recipeReposiory.findAll().isEmpty()) {


                Ingredient i1 = new Ingredient("Cebula", u1, 1);
                Ingredient i2 = new Ingredient("Syrop klonowy", u4, 1);
                Ingredient i3 = new Ingredient("ocet winny, czerwony", u4, 2);
                Ingredient i4 = new Ingredient("seler naciowy, ??odyga", u1, 2);
                Ingredient i5 = new Ingredient("z??bek czosnku", u1, 2);
                Ingredient i6 = new Ingredient("pomidory z puszki", u2, 400);
                Ingredient i7 = new Ingredient("fasloa czerwona z puszki", u2, 255);
                Ingredient i8 = new Ingredient("kukurydza konserwowa", u2, 285);
                Ingredient i9 = new Ingredient("koncentrat pomidorowy", u4, 2);
                Ingredient i10 = new Ingredient("papryczka chili czerwona", u1, 1);
                Ingredient i11 = new Ingredient("olej rzepakowy", u4, 2);
                Ingredient i12 = new Ingredient("s??l", u5, 1);
                Ingredient i13 = new Ingredient("czekolada gorzka >70% kakao ", u2, 18);
                Ingredient i14 = new Ingredient("li???? laurowy", u1, 3);
                Ingredient i15 = new Ingredient("oregano suszone", u6, 2);
                Ingredient i16 = new Ingredient("papryka w??dzona mielona", u6, 1);
                Ingredient i17 = new Ingredient("papryka w??dzona mielona", u6, 1);
                Ingredient i18 = new Ingredient("kminek mielony ", u6, 0.5F);
                Ingredient i19 = new Ingredient("pieprz czarny ", u6, 1);
                Ingredient i20 = new Ingredient("tofu w??dzone ", u2, 180);


                List<Ingredient> i = new ArrayList<>();
                i.add(i1);
                i.add(i2);
                i.add(i3);
                i.add(i4);
                i.add(i5);
                i.add(i6);
                i.add(i7);
                i.add(i8);
                i.add(i9);
                i.add(i10);
                i.add(i11);
                i.add(i12);
                i.add(i13);
                i.add(i14);
                i.add(i15);
                i.add(i16);
                i.add(i17);
                i.add(i18);
                i.add(i19);
                i.add(i20);

                ingredientRepository.saveAll(i);
                Set<Category> set = new HashSet<Category>();
                set.add(c2);
                set.add(c4);

                LocalDate ld1 = LocalDate.of(2022, 2, 21);
                Recipe r1 = new Recipe(1L, "CHILI CON TOFU", "Tofu mocno ods??czamy, u??ywaj??c r??cznika kuchennego. Nast??pnie przek??adamy je do miski i dok??adnie rozdrabniamy widelcem, aby przypomina??o struktur?? mielone mi??so. Tak przygotowane tofu przek??adamy na patelni?? i sma??ymy kilka minut, a?? nabierze z??otego koloru. Gotowe tofu przek??adamy do miski.\n" +
                        "Seler naciowy siekamy na mniejsze kawa??ki. Do przesma??onych przypraw dodajemy koncentrat pomidorowy i pomidory w zalewie. Do tak przygotowanego sosu dodajemy li??cie laurowe, przesma??one tofu i seler. Ca??o???? dok??adnie mieszamy, przyprawiamy sol?? i pieprzem do smaku i dusimy przez ok. 25 minut na ma??ym ogniu.\n" +
                        "Do sosu dodajemy kukurydz??, czekolad?? i odcedzon?? fasol??. Tak przygotowany sos dusimy przez ok. 10 minut.\n" +
                        "Awokado kroimy w plasterki. Kolendr?? delikatnie siekamy.\n" +
                        "\n" +
                        "Chili wyk??adamy na talerz, posypujemy kolendr??, uk??adamy nachos i ozdabiamy ??mietan??.\n" +
                        "\n", i, 30, d1, set, true, 4, ld1);

                Ingredient i21 = new Ingredient("granola orzechowa", u2, 250);
                Ingredient i22 = new Ingredient("jogurt ro??linny", u2, 200);
                Ingredient i23 = new Ingredient("mas??o", u2, 60);
                Ingredient i24 = new Ingredient("truskawka", u1, 4);
                Ingredient i25 = new Ingredient("malina", u2, 70);
                Ingredient i26 = new Ingredient("kiwi", u1, 2);
                Ingredient i27 = new Ingredient("je??yna", u2, 70);
                Ingredient i28 = new Ingredient("??urawina", u4, 1);
                Ingredient i29 = new Ingredient("pistacje", u2, 40);

                List<Ingredient> il2 = new ArrayList<>();
                il2.add(i21);
                il2.add(i22);
                il2.add(i23);
                il2.add(i24);
                il2.add(i25);
                il2.add(i26);
                il2.add(i27);
                il2.add(i28);
                il2.add(i29);

                ingredientRepository.saveAll(il2);
                Set<Category> set2 = new HashSet<Category>();
                set2.add(c1);
                set2.add(c4);
                set2.add(c5);

                LocalDate ld2 = LocalDate.of(2022, 4, 10);
                Recipe r2= new Recipe(2L, "PIZZA ??NIADANIOWA NA S??ODKO", "Mas??o roztapiamy w mikrofali lub rondelku. Granol?? ????czymy z roztopionym mas??em.\n" +
                        "Granol?? wymieszan?? z mas??em przek??adamy do formy do tarty wy??o??onej papierem do pieczenia i pieczemy ok. 7 minut. Gotowy sp??d pizzy ??niadaniowej studzimy.\n" +
                        "Kiwi obieramy, przekrawamy na p???? wzd??u?? owocu i kroimy w plasterki. Truskawki pozbawiamy szypu??ek i kroimy w plastry wzd??u?? owoc??w. ??urawiny tak??e kroimy w plastry.\n" +
                        "Jogurt wyk??adamy na podpieczony sp??d z granoli, pozostawiaj??c brzegi przypominaj??ce rant pizzy. Nast??pnie w okr??gach, od zewn??trz, uk??adamy owoce. Dodatkowo pizz?? ozdabiamy pistacjami.",
                        il2, 15, d1, set2, true, 6, ld2);


                Ingredient i30 = new Ingredient("ser feta", u2, 200);
                Ingredient i31 = new Ingredient("jogurt grecki", u2, 200);
                Ingredient i32 = new Ingredient("oliwa z oliwek", u4, 5);
                Ingredient i33 = new Ingredient("oregano suszone", u6, 1);
                Ingredient i34 = new Ingredient("pieprz czarny", u5, 3);
                Ingredient i35 = new Ingredient("s??l", u5, 3);
                Ingredient i36 = new Ingredient("pomidorki koktajlowe", u2, 200);

                List<Ingredient> il3 = new ArrayList<>();
                il3.add(i30);
                il3.add(i31);
                il3.add(i32);
                il3.add(i33);
                il3.add(i34);
                il3.add(i35);
                il3.add(i36);

                ingredientRepository.saveAll(il3);
                Set<Category> set3 = new HashSet<Category>();
                set3.add(c2);
                set3.add(c3);
                set3.add(c4);

                LocalDate ld3 = LocalDate.of(2022, 11, 11);
                Recipe r3= new Recipe(3L, "DIP Z FETY Z PIECZONYMI POMIDORKAMI", "Ser feta i jogurt grecki wyjmij z lod??wki, aby w momencie u??ycia mia??y temperatur?? pokojow??.\n" +
                        "Sk??adniki dipu umieszczamy w rozdrabniaczu i mieszamy, a?? uzyskamy puszysty krem.\n" +
                        "Blach?? wyk??adamy papierem do pieczenia. Uk??adamy na niej pomidorki, polewamy je oliw?? i posypujemy sol?? i pieprzem do smaku. Pieczemy je przez ok. 20 minut, uwa??aj??c, aby si?? nie przypali??y.\n" +
                        "Na g????boki talerz nak??adamy dip z fety. Na nim uk??adamy podpieczone pomidorki i ca??o???? skrapiamy oliw?? pozosta???? po pieczeniu.\n" +
                        "\n" +
                        "Dip podajemy z grzankami z czerstwego pieczywa lub podpieczon?? pit??.",
                        il3, 10, d2, set3, false, 4, ld3);

                Ingredient i37 = new Ingredient("jajko", u1, 2);
                Ingredient i38 = new Ingredient("papryka czerwona", u2, 20);
                Ingredient i39 = new Ingredient("li??cie szpinaku", u2, 10);
                Ingredient i40 = new Ingredient("pomidorki koktajlowe", u2, 10);
                Ingredient i41 = new Ingredient("starty ser cheddar", u2, 20);
                Ingredient i42 = new Ingredient("mas??o", u4, 0.25F);

                List<Ingredient> il4 = new ArrayList<>();
                il4.add(i37);
                il4.add(i38);
                il4.add(i39);
                il4.add(i40);
                il4.add(i41);
                il4.add(i42);

                ingredientRepository.saveAll(il4);
                Set<Category> set4 = new HashSet<Category>();
                set4.add(c1);
                set4.add(c4);

                LocalDate ld4 = LocalDate.of(2022, 12, 13);
                Recipe r4= new Recipe(4L, "Omlet Z Warzywami", "Pokr??j papryk??, pomidorki koktajlowe oraz szpinak w drobne kawa??ki.\n" +
                        "Do miski wbij jajka i dok??adnie je ubij.\n" +
                        "Rozgrzej patelni?? na ??rednim ogniu i dodaj mas??o.\n" +
                        "Na roztopione mas??o wlej ubite jajka.\n" +
                        "Za pomoc?? szpachelki gumowej, zgarniaj jajka z brzeg??w patelni i przek??adaj je do ??rodka omleta.\n" +
                        "Kiedy jajka b??d?? ju?? ??ci??te, ale g??rna cz?????? omleta b??dzie jeszcze wilgotna, wsyp pokrojone wcze??niej warzywa i dodaj ser.\n" +
                        "Sma?? pod pokrywk?? przez 1 minut??.\n" +
                        "Nast??pnie obr???? omleta na drug?? stron?? i przykryj patelni??.\n" +
                        "Sma?? przez 1-2 minut.\n" +
                        "Zdejmij z patelni i prze?????? na talerz.\n" +
                        "Posyp odrobin?? soli i pieprzu.",
                        il4, 10, d2, set4, false, 1, ld4);

                Ingredient i43 = new Ingredient("filet z kurczaka", u2, 300);
                Ingredient i44 = new Ingredient("czosnek granulowany", u6, 1);
                Ingredient i45 = new Ingredient("suszone oregano", u6, 1);
                Ingredient i46 = new Ingredient("s??odka papryka", u6, 0.5F);
                Ingredient i47 = new Ingredient("kmin rzymski", u2, 0.5F);
                Ingredient i48 = new Ingredient("chili", u5, 1);
                Ingredient i49 = new Ingredient("oliwa", u4, 1);
                Ingredient i50 = new Ingredient("makaron", u2, 150);
                Ingredient i51 = new Ingredient("cebula", u1, 0.5F);
                Ingredient i52 = new Ingredient("bulion", u3, 40);
                Ingredient i53 = new Ingredient("??mietanka", u3, 125);
                Ingredient i54 = new Ingredient("tarty ser ??????ty", u2, 30);
                Ingredient i55 = new Ingredient("posiekana natka pietruszki", u4, 1);

                List<Ingredient> il5 = new ArrayList<>();
                il5.add(i43);
                il5.add(i44);
                il5.add(i45);
                il5.add(i46);
                il5.add(i47);
                il5.add(i48);
                il5.add(i49);
                il5.add(i50);
                il5.add(i51);
                il5.add(i52);
                il5.add(i53);
                il5.add(i54);
                il5.add(i55);



                ingredientRepository.saveAll(il5);
                Set<Category> set5 = new HashSet<Category>();
                set5.add(c2);


                LocalDate ld5 = LocalDate.of(2022, 12, 22);
                Recipe r5= new Recipe(5L, "MAKARON Z GRILLOWANYM KURCZAKIEM", "urczaka przekroi?? wzd??u?? na 2 cie??sze filety, rozbi?? t??uczkiem na tak?? sam?? grubo????.\n" +
                        "Doprawi?? sol??, pieprzem, czosnkiem, papryk??, kminem i chili.\n" +
                        "Wysmarowa?? oliw?? i od??o??y?? do zamarynowania je??li mamy czas.\n" +
                        "Nastawi?? osolon?? wod?? na makaron i ugotowa?? al dente.\n" +
                        "Na patelni grillowej lub zwyk??ej patelni usma??y?? filety (po oko??o 3 - 4 minuty z ka??dej strony). Od??o??y?? na talerz.\n" +
                        "Na t?? sam?? patelni?? wrzuci?? pokrojon?? w kosteczk?? cebul?? i zeszkli?? j??.\n" +
                        "Wla?? bulion i gotowa?? przez ok. 2 minuty. Je??li u??ywali??my patelni grillowej przela?? zawarto???? na inn?? du???? patelni?? z g??adkim dnem.\n" +
                        "Po zagotowaniu wla?? ??mietank?? i zagotowa??. W??o??y?? w sos odcedzony makaron, posypa?? posiekanym kurczakiem i delikatnie zanurzy?? go w potraw??.\n" +
                        "Posypa?? tarym serem i natk?? pietruszki. Odstawi?? z ognia i podawa??.",
                        il5, 40, d3, set5, false, 2, ld5);


                recipeReposiory.save(r1);
                recipeReposiory.save(r2);
                recipeReposiory.save(r3);
                recipeReposiory.save(r4);
                recipeReposiory.save(r5);
            }

            if(likeRepository.findAll().isEmpty()){
                likeService.addLike(1L, 1L);
                likeService.addLike(2L, 1L);
                likeService.addLike(3L, 1L);
                likeService.addLike(4L, 1L);
                likeService.addLike(5L, 1L);
                likeService.addLike(1L, 2L);
                likeService.addLike(1L, 3L);
                likeService.addLike(5L, 2L);
                likeService.addLike(2L, 3L);
                likeService.addLike(1L, 4L);

            }
        };
    }

}
