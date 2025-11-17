package com.practice.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.demo.dto.FinalReportResponse;
import com.practice.demo.dto.FinalSaveDTO;
import com.practice.demo.dto.ReportResponseDTO;
import com.practice.demo.entity.ReportSaveEntity;
import com.practice.demo.payload.ApiResponse;
import com.practice.demo.services.FinalSaveReportService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping
@CrossOrigin
public class FinalSaveReportWithMetaDataController {

    private final FinalSaveReportService finalSaveReportService;

    @PostMapping("finalsave")
    public ResponseEntity<?> postMethodName(@RequestBody FinalSaveDTO finalSaveDTO) {
        System.out.println(finalSaveDTO.toString());
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/savefinalreport")
    public ResponseEntity<ApiResponse> saveReport(@RequestBody FinalSaveDTO entity) {
        return ResponseEntity.ok().body(finalSaveReportService.savereport(entity));
    }

    @GetMapping("/getAllSavedReport")
    public ResponseEntity<List<FinalReportResponse>> getAllSavedReport() {
        return ResponseEntity.ok().body(finalSaveReportService.getAllSavedReport());
    } 
}
