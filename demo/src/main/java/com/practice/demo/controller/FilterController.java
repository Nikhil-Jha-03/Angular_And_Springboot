package com.practice.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.practice.demo.dto.FilterDTO;
import com.practice.demo.dto.ReportFilterDTO;
import com.practice.demo.services.FilterService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequiredArgsConstructor
@CrossOrigin
public class FilterController {

    @Autowired
    private FilterService filterService;

    @GetMapping("filter")
    public ResponseEntity<List<FilterDTO>> getMethodName() {
        return ResponseEntity.ok().body(filterService.getFilterList());
    }

    @PostMapping("reportwithfilterdata")
    public ResponseEntity<List<Map<String,Object>>> getFilterReportData(@RequestBody ReportFilterDTO entity) {
        try {
            return ResponseEntity.ok().body(filterService.getFilteredReport(entity));
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }
}
