package com.practice.demo.services.implementation;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.practice.demo.dto.FilterRequestDTO;
import com.practice.demo.dto.FinalSaveDTO;
import com.practice.demo.dto.ReportRequestDTO;
import com.practice.demo.dto.ReportResponseDTO;
import com.practice.demo.dto.ReportSave;
import com.practice.demo.entity.ReportSaveEntity;
import com.practice.demo.entity.ReportType;
import com.practice.demo.payload.ApiResponse;
import com.practice.demo.payload.HandlevariousErrors;
import com.practice.demo.repository.ReportSaveRepository;
import com.practice.demo.repository.ReportTypeRepository;
import com.practice.demo.services.ReportService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportImplementation implements ReportService {

    private final ReportTypeRepository reportTypeRepository;
    private final EntityManager entityManager;
    private final ReportSaveRepository reportSaveRepository;
    private final ObjectMapper objectMapper;

    @Override
    public ReportResponseDTO getColumnData(ReportRequestDTO reportRequestDTO, Long reportTypeId) {
        System.out.println("reportRequestDTO");
        try {
            // 1. Get Report Type
            ReportType reportType = reportTypeRepository.findById(reportTypeId)
                    .orElseThrow(() -> new HandlevariousErrors("ReportType not found with id: " + reportTypeId));

            String table = reportType.getPrimaryObject();

            // 2. Validate Selected Columns
            List<String> selectedColumns = reportRequestDTO.getSelectedColumns();
            if (selectedColumns == null || selectedColumns.isEmpty()) {
                throw new HandlevariousErrors("No columns selected for the report.");
            }

            // 3. Build SQL Query with proper spacing
            String sql = "SELECT " + String.join(", ", selectedColumns) + " FROM " + table;

            // 4. Execute Query
            Query query = entityManager.createNativeQuery(sql);
            List<Object> result = query.getResultList();

            // 5. Convert Results to Map Structure
            List<Map<String, Object>> rows = new ArrayList<>();
            for (Object rowObj : result) {
                Map<String, Object> map = new LinkedHashMap<>();

                if (selectedColumns.size() == 1) {
                    // Single column case
                    map.put(selectedColumns.get(0), rowObj);
                } else {
                    // Multiple columns case
                    Object[] row = (Object[]) rowObj;
                    for (int i = 0; i < selectedColumns.size(); i++) {
                        map.put(selectedColumns.get(i), row[i]);
                    }
                }
                rows.add(map);
            }

            // 6. Build and Return Response
            ReportResponseDTO reportResponseDTO = new ReportResponseDTO();
            reportResponseDTO.setColumns(selectedColumns);
            reportResponseDTO.setRows(rows);

            return reportResponseDTO;

        } catch (HandlevariousErrors e) {
            throw e;
        } catch (Exception e) {
            throw new HandlevariousErrors("Error generating report: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse savereport(ReportSave dto) {

        try {
            List<String> selectedColumn = dto.getSelectedCloumns();
            List<FilterRequestDTO> selectedFilter = dto.getAppliedfilter();
            String selectedCloumnsJson = objectMapper.writeValueAsString(selectedColumn);
            String selectedFilterJson = objectMapper.writeValueAsString(selectedFilter);

            ReportSaveEntity entity = new ReportSaveEntity();
            entity.setReportName(dto.getReportName());
            entity.setTableName(dto.getTableName());
            entity.setSelectedColumnsJson(selectedCloumnsJson);
            entity.setAppliedFiltersJson(selectedFilterJson);

            reportSaveRepository.save(entity);
            return new ApiResponse(true, "Report saved Successfully");

        } catch (JsonProcessingException e) {
            return new ApiResponse(false, "Something went wrong");

        }

    }

    @Override
    public List<ReportSave> getSavedReport() {
        List<ReportSaveEntity> reportSavesEntities = reportSaveRepository.findAll();
        List<ReportSave> reportSaves = reportSavesEntities.stream().map(item -> {
            ReportSave dto = new ReportSave();
            dto.setId(item.getId());
            dto.setReportName(item.getReportName());
            dto.setTableName(item.getTableName());
            try {
                dto.setSelectedCloumns(objectMapper.readValue(
                        item.getSelectedColumnsJson(),
                        new TypeReference<List<String>>() {
                        }));

                dto.setAppliedfilter(objectMapper.readValue(
                        item.getAppliedFiltersJson(),
                        new TypeReference<List<FilterRequestDTO>>() {
                        }));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            return dto;
        }).toList();

        System.out.println("reportSaves"+reportSaves);

        return reportSaves;
    }


}
