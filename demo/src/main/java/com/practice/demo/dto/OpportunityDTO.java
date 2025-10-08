package com.practice.demo.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpportunityDTO {
    private Long id;
    private String name;
    private String stage;
    private Double amount;
    private LocalDate closeDate;
    private AccountDTO account;
}

