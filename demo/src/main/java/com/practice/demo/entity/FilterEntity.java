package com.practice.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Filter_Entity")
public class FilterEntity {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;

@NotBlank(message = "Filter Name Name is required")
private String filterName;

}