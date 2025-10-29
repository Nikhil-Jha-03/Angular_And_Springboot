package com.practice.demo.controller;

import java.util.List;

import com.practice.demo.dto.FilterDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportRequestDTO {
private String tableName;
    private List<String> selectedColumns;
    private List<FilterDTO> filters;
}
