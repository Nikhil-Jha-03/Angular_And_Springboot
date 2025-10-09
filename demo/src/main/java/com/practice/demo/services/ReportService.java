package com.practice.demo.services;

import com.practice.demo.dto.ReportRequestDTO;
import com.practice.demo.dto.ReportResponseDTO;

public interface ReportService {

    ReportResponseDTO getColumnData(ReportRequestDTO reportRequestDTO, Long reportTypeId);

}
