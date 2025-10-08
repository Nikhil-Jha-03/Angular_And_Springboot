package com.practice.demo.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Accounts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Account name is required")
    @Size(max = 100, message = "Account name must be less than 100 characters")
    private String name;

    @NotBlank(message = "Industry is required")
    @Size(max = 50, message = "Industry must be less than 50 characters")
    private String industry;

    @NotNull(message = "Annual revenue is required")
    @PositiveOrZero(message = "Annual revenue must be zero or positive")
    private Double annualRevenue;

    @OneToMany(mappedBy = "contactAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contacts> contact = new ArrayList<>();

    @OneToMany(mappedBy = "opportunityAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Opportunity> opportunity = new ArrayList<>();

}
