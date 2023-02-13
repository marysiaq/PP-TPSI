package com.example.spring.RESTcontrollers;

import java.util.*;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.validation.Valid;

import com.example.spring.models.ERole;
import com.example.spring.models.Role;
import com.example.spring.models.User;
import com.example.spring.payload.request.LoginRequest;
import com.example.spring.payload.request.SignupRequest;
import com.example.spring.payload.response.JwtResponse;
import com.example.spring.payload.response.MessageResponse;
import com.example.spring.repositories.RoleRepository;
import com.example.spring.repositories.UserRepository;
import com.example.spring.configurations.security.services.jwt.JwtUtils;
import com.example.spring.servicesimplementations.UserDetailsImpl;
import com.example.spring.services.EmailService;
import com.example.spring.validators.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	EmailService emailService;
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
		if(user.isPresent()){
			if(!user.get().isEnabled()) return new ResponseEntity("Konto nie jest aktywne!", HttpStatus.I_AM_A_TEAPOT);
		}


		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt,
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, BindingResult bindingResult) throws MessagingException {
		System.out.println(signUpRequest.getPassword());
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Nazwa użytkownika jest już zajęta!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("E-mail jest już używany!"));
		}

		if(!signUpRequest.getPassword().matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")){
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Hasło musi zawierać cyfrę, dużą i małą literę i składać się co najmniej z 8 znaków!"));
		}

		User user = new User(signUpRequest.getUsername(),
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Nie znaleziono roli!"));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);;
		user.setActivationCode(UUID.randomUUID().toString());
		userRepository.save(user);
		emailService.sendMimeMessage(user.getEmail(),"Aktywacja konta", emailService.build("Witaj!","Aktywacja konta","Przejdź pod adres: ",user.getActivationCode()));


		return ResponseEntity.ok(new MessageResponse("Rejestracja się powiodła!"));
	}
	@InitBinder("signUpRequest")
	public void initBinder(WebDataBinder binder){
		binder.addValidators(new PasswordValidator());
	}

}
