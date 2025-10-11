package com.practice.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.practice.demo.dto.ReportColumnDTO;
import com.practice.demo.services.ReportColumnService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
@CrossOrigin
public class ReportColumnController {

    public final ReportColumnService reportColumnService;


    @GetMapping("/column/{reportTypeId}")
    public ResponseEntity<List<ReportColumnDTO>> postMethodName(@PathVariable Long reportTypeId) {
        return ResponseEntity.ok().body(reportColumnService.getColumn(reportTypeId));
    }

}
