package com.practice.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private Long id;
    private String name;
    private String industry;
    private Double annualRevenue;
    private List<ContactDTO> contacts;
    private List<OpportunityDTO> opportunities;
}
