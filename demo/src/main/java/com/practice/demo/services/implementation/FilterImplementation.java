package com.practice.demo.services.implementation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.practice.demo.dto.FilterDTO;
import com.practice.demo.dto.FilterRequestDTO;
import com.practice.demo.dto.ReportFilterDTO;
import com.practice.demo.entity.FilterEntity;
import com.practice.demo.repository.FilterRepository;
import com.practice.demo.services.FilterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FilterImplementation implements FilterService {

    private final FilterRepository filterRepository;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<FilterDTO> getFilterList() {
        List<FilterEntity> filterEntity = filterRepository.findAll();

        List<FilterDTO> filterDTOs = filterEntity.stream().map(filter -> {
            FilterDTO dto = new FilterDTO();
            dto.setId(filter.getId());
            dto.setValue(filter.getFilterName());
            return dto;
        }).toList();
        return filterDTOs;
    }

    @Override
    public List<Map<String, Object>> getFilteredReport(ReportFilterDTO entity) {

        StringBuilder sql = new StringBuilder("SELECT ");

        if (entity.getSelectedColumns().isEmpty()) {
            sql.append("*");
        } else {
            sql.append(String.join(", ", entity.getSelectedColumns()));
        }

        // add table name;

        sql.append(" FROM ").append(entity.getTableName());

        List<Object> params = new ArrayList<>();

        if (entity.getFilters() != null && !entity.getFilters().isEmpty()) {
            sql.append(" WHERE ");

            List<String> condition = new ArrayList<>();

            for (FilterRequestDTO f : entity.getFilters()) {
                String conditionsString = buildCondtion(f);
                condition.add(conditionsString);
                params.add(getParameterValue(f));
                System.out.println(getParameterValue(f));
            }

            sql.append(String.join(" AND ", condition));
        }

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql.toString(), params.toArray());
        System.out.println(jdbcTemplate.queryForList(sql.toString(), params.toArray()));
        return result;
    }

    private Object getParameterValue(FilterRequestDTO filter) {
        String operator = filter.getOperators().toLowerCase();
        String value = filter.getValue();
        switch (operator) {
            case "contains":
                return "%" + value + "%";
            case "starts with":
                return value + "%";
            case "ends with":
                return "%" + value;
            default:
                return value;
        }
    }

    private String buildCondtion(FilterRequestDTO filter) {
        String column = filter.getColumnName();
        String operator = filter.getOperators();

        switch (operator.toLowerCase()) {
            case "equals":
                return column + " = ?";
            case "contains":
                return column + " LIKE ?";
            case "starts with":
                return column + " LIKE ?";
            case "ends with":
                return column + " LIKE ?";
            case "not equals":
                return column + " != ?";
            default:
                return column + " = ?";
        }
    }

}
