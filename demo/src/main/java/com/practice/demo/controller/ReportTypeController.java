package com.practice.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.demo.dto.ReportTypeDTO;
import com.practice.demo.services.ReportTypeService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("reporttype")
public class ReportTypeController {

    private final ReportTypeService reportTypeService;

    @GetMapping("/allreport")
    public ResponseEntity<List<ReportTypeDTO>> getMethodName() {
        return ResponseEntity.ok().body(reportTypeService.getAllReport());
    }

}
