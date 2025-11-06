package com.practice.demo.services;

import java.util.List;

import com.practice.demo.dto.ReportRequestDTO;
import com.practice.demo.dto.ReportResponseDTO;
import com.practice.demo.dto.ReportSave;
import com.practice.demo.payload.ApiResponse;

public interface ReportService {

    ReportResponseDTO getColumnData(ReportRequestDTO reportRequestDTO, Long reportTypeId);

    ApiResponse savereport(ReportSave entity);

    List<ReportSave> getSavedReport();

}
