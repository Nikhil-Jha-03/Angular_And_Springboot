package com.practice.demo.services;

import java.util.List;
import java.util.Map;

import com.practice.demo.dto.FilterDTO;
import com.practice.demo.dto.ReportFilterDTO;

public interface FilterService {

    List<FilterDTO> getFilterList();

    List<Map<String,Object>> getFilteredReport(ReportFilterDTO dto);

}
