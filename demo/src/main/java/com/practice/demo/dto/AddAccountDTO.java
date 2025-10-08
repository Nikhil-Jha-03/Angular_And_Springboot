package com.practice.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddAccountDTO {
    private String name;
    private String industry;
    private Double annualRevenue;
}
