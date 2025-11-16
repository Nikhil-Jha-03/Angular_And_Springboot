package com.practice.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class FilterRequestDTO {
    private Long id;
    private Long accountId;
    private String columnName;
    private String operators;
    private String value;
    private String logicalOperator;
}
