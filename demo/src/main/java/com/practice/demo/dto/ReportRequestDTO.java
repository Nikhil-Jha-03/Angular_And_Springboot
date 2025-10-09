package com.practice.demo.dto;

import java.util.List;
// import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportRequestDTO {
    private List<String> selectedColumns;
    // private Map<String, Object> filters; handling filter on the frontend
}
