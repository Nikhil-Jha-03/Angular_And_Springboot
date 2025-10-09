package com.practice.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportColumnDTO {
    private Long id;
    private String columnName;
    private String displayName;
    private String dataType;
    private Long reportType;
}
