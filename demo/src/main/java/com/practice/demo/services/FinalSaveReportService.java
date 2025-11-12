package com.practice.demo.services;

import com.practice.demo.dto.FinalSaveDTO;
import com.practice.demo.dto.ReportResponseDTO;

public interface FinalSaveReportService {

    ReportResponseDTO savereport(FinalSaveDTO entity);

}
