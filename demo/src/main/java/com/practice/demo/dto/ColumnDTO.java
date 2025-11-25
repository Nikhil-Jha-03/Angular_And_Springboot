package com.practice.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnDTO {
    private List<String> primary;;
    private List<String> secondary;
    private List<String> tertiary;

}
