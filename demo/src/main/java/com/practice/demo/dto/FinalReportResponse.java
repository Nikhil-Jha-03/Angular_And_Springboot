package com.practice.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class FinalReportResponse {
    private String name;
    private String apiName;
    private String primaryObject;
    private String secondaryObject;
    private String tertiaryObject;
    private List<JoinQueryDTO> joinQuery;
    private List<SectionDTO> sections;
}
