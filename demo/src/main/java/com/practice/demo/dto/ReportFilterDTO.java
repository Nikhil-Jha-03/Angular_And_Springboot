package com.practice.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportFilterDTO {
    private String tableName;
    private List<String> selectedColumns;
    private List<FilterRequestDTO> filters;
}
