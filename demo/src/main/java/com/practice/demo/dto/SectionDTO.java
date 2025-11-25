package com.practice.demo.dto;

import java.util.List;

import com.practice.demo.entity.FinalReportSaveEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class SectionDTO {
    private String name;
    private List<String> columns;
}

