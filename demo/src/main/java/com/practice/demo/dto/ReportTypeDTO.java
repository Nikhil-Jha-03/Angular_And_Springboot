package com.practice.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportTypeDTO {
    private Long id;
    private String name;
    private String primaryObject;
}
