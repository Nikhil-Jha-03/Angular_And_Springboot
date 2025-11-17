package com.practice.demo.services;

import java.util.List;

import com.practice.demo.dto.FinalReportResponse;
import com.practice.demo.dto.FinalSaveDTO;
import com.practice.demo.dto.ReportResponseDTO;
import com.practice.demo.payload.ApiResponse;

public interface FinalSaveReportService {

    ApiResponse savereport(FinalSaveDTO entity);

    List<FinalReportResponse> getAllSavedReport();
}
