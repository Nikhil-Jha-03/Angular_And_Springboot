package com.practice.demo.services.implementation;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.practice.demo.dto.ReportRequestDTO;
import com.practice.demo.dto.ReportResponseDTO;
import com.practice.demo.entity.ReportType;
import com.practice.demo.repository.ReportTypeRepository;
import com.practice.demo.services.ReportService;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportImplementation implements ReportService {

    private final ReportTypeRepository reportTypeRepository;
    private final EntityManager entityManager;

    @Override
    public ReportResponseDTO getColumnData(ReportRequestDTO reportRequestDTO, Long reportTypeId) {
        // Implement your logic here to fetch and return the report data based on
        // reportRequestDTO and reportTypeId

        ReportType reportType = reportTypeRepository.findById(reportTypeId)
                .orElseThrow(() -> new RuntimeException("ReportType not found with id: " + reportTypeId));
        String table = reportType.getPrimaryObject();
        System.out.println("Table Name: " + table);

        List<String> selectedColumns = reportRequestDTO.getSelectedColumns();
        if (selectedColumns == null || selectedColumns.isEmpty()) {
            throw new RuntimeException("No columns selected for the report.");
        }
        String sql = "SELECT " + String.join(",", selectedColumns) + " FROM " + table;

        jakarta.persistence.Query query = entityManager.createNativeQuery(sql);
        List<Object[]> result = query.getResultList();

        List<Map<String, Object>> rows = new ArrayList<>();
        for (Object rowObj : result) {
            Map<String, Object> map = new LinkedHashMap<>();

            if (selectedColumns.size() == 1) {
                // Single column returns Object directly
                map.put(selectedColumns.get(0), rowObj);
            } else {
                // Multiple columns returns Object[]
                Object[] row = (Object[]) rowObj;
                for (int i = 0; i < selectedColumns.size(); i++) {
                    map.put(selectedColumns.get(i), row[i]);
                }
            }

            rows.add(map);
        }
        System.out.println("Rows: " + rows);

        ReportResponseDTO reportResponseDTO = new ReportResponseDTO();
        reportRequestDTO.setSelectedColumns(selectedColumns);
        reportResponseDTO.setRows(rows);

        return reportResponseDTO;

    }

}
