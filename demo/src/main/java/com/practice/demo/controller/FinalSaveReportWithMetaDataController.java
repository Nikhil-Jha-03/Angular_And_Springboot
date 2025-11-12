package com.practice.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.practice.demo.dto.FinalSaveDTO;
import com.practice.demo.dto.ReportResponseDTO;
import com.practice.demo.entity.FinalReportSaveEntity;
import com.practice.demo.entity.Section;
import com.practice.demo.services.FinalSaveReportService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

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

    @PostMapping("savereport")
    public ResponseEntity<ReportResponseDTO> saveReport(@RequestBody FinalSaveDTO entity) {
        return ResponseEntity.ok().body(finalSaveReportService.savereport(entity));
    }

}
