package com.practice.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.demo.dto.ReportRequestDTO;
import com.practice.demo.dto.ReportResponseDTO;
import com.practice.demo.dto.ReportSave;
import com.practice.demo.services.ReportService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
@CrossOrigin
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/data/{reportTypeId}")
    public ResponseEntity<ReportResponseDTO> postMethodName(@RequestBody ReportRequestDTO reportRequestDTO,
            @PathVariable Long reportTypeId) {
        System.out.println("ReportRequestDTO");
        System.out.println(reportRequestDTO);

        return ResponseEntity.ok().body(reportService.getColumnData(reportRequestDTO, reportTypeId));
    }

    @PostMapping("/savereport")
    public ResponseEntity<?> postMethodName(@RequestBody ReportSave dto) {
        return ResponseEntity.ok().body(reportService.savereport(dto));
    }



    @GetMapping("/getsavereport")
    public ResponseEntity<List<ReportSave>> getMethodName() {
        System.out.println("reportSaves");
        return ResponseEntity.ok().body(reportService.getSavedReport());
    }
    

}
