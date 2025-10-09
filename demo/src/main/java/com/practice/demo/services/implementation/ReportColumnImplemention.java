package com.practice.demo.services.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.practice.demo.dto.ReportColumnDTO;
import com.practice.demo.entity.ReportColumn;
import com.practice.demo.repository.ReportColumnRepository;
import com.practice.demo.services.ReportColumnService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportColumnImplemention implements ReportColumnService {

    private final ReportColumnRepository reportColumnRepository;

    @Override
    public List<ReportColumnDTO> getColumn(Long reportTypeId) {

        List<ReportColumn> newColumns = reportColumnRepository.findByReportTypeId(reportTypeId);
        List<ReportColumnDTO> reportCloumnDtos = newColumns.stream().map(column -> {

            ReportColumnDTO dto = new ReportColumnDTO();
            dto.setId(column.getId());
            dto.setColumnName(column.getColumnName());
            dto.setDisplayName(column.getDisplayName());
            dto.setDataType(column.getDataType());
            dto.setReportType(column.getReportType().getId());
            return dto;

        }).toList();
        System.out.println("Report Type ID: " + reportTypeId);

        System.out.println(reportCloumnDtos);
        return reportCloumnDtos;
    }

}
