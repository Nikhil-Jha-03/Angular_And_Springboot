package com.practice.demo.services;

import java.util.List;

import com.practice.demo.dto.ReportColumnDTO;

public interface ReportColumnService {
    List<ReportColumnDTO> getColumn(Long reportTypeId);
}
