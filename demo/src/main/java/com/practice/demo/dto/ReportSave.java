package com.practice.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportSave {
    private String reportName;
    private String tableName;
    private List<String> selectedCloumns;
    private List<FilterRequestDTO> appliedfilter;
}

// create the saved report entity and now save the data coming from the frontend
