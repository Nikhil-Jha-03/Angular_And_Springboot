package com.practice.demo.services.implementation;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.practice.demo.dto.ReportTypeDTO;
import com.practice.demo.entity.ReportType;
import com.practice.demo.repository.ReportTypeRepository;
import com.practice.demo.services.ReportTypeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportTypeImplemention implements ReportTypeService {

    private final ReportTypeRepository reportTypeRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<ReportTypeDTO> getAllReport() {
        System.out.println("null");
        List<ReportType> reportTypes = reportTypeRepository.findAll();
        List<ReportTypeDTO> reportTypeDTOs = reportTypes.stream()
        .map(items -> modelMapper.map(items, ReportTypeDTO.class))
        .toList();
        return reportTypeDTOs;
    }

}
