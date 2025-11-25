package com.practice.demo.services.implementation;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.practice.demo.dto.ColumnDTO;
import com.practice.demo.dto.FinalReportResponse;
import com.practice.demo.dto.FinalSaveDTO;
import com.practice.demo.dto.JoinQueryDTO;
import com.practice.demo.dto.ReportResponseDTO;
import com.practice.demo.entity.Accounts;
import com.practice.demo.entity.Contacts;
import com.practice.demo.entity.FinalReportSaveEntity;
import com.practice.demo.entity.JoinQueryEntity;
import com.practice.demo.entity.Opportunity;
import com.practice.demo.entity.Section;
import com.practice.demo.payload.ApiResponse;
// import com.practice.demo.repository.AccountRepository;
// import com.practice.demo.repository.ContactRepository;
import com.practice.demo.repository.FinalReportSaveWithMetaDataReporitory;
// import com.practice.demo.repository.OpportunityRepository;
// import com.practice.demo.repository.SectionRepository;
import com.practice.demo.services.FinalSaveReportService;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FInalSaveImplementation implements FinalSaveReportService {

    private final FinalReportSaveWithMetaDataReporitory finalReportSaveWithMetaDataReporitory;
    private final ModelMapper modelMapper;

    @Override
    public ApiResponse savereport(FinalSaveDTO entity) {

    FinalReportSaveEntity finalReportSaveEntity = new FinalReportSaveEntity();
    finalReportSaveEntity.setName(entity.getName());
    finalReportSaveEntity.setApiName(entity.getApiName());
    finalReportSaveEntity.setPrimaryObject(entity.getPrimaryObject());
    finalReportSaveEntity.setSecondaryObject(entity.getSecondaryObject());
    finalReportSaveEntity.setTertiaryObject(entity.getTertiaryObject());

    // Convert join queries
    List<JoinQueryEntity> joinEntities = entity.getJoinQuery().stream()
            .map(j -> {
                JoinQueryEntity newEntity = new JoinQueryEntity();
                newEntity.setId(j.getId());
                newEntity.setFromObject(j.getFromObject());
                newEntity.setFromField(j.getFromField());
                newEntity.setToObject(j.getToObject());
                newEntity.setToField(j.getToField());
                newEntity.setJoinType(j.getJoinType());
                newEntity.setFinalReportSaveEntity(finalReportSaveEntity);
                return newEntity;
            })
            .collect(Collectors.toList());



    List<Section> sections = new ArrayList<>();

    ColumnDTO col = entity.getColumns();

    // Primary
    if (entity.getPrimaryObject() != null && !entity.getPrimaryObject().isEmpty()) {
        Section section = new Section();
        section.setName(entity.getPrimaryObject());
        section.setColumns(col.getPrimary());   // USE CLIENT VALUES HERE
        section.setFinalReportSaveEntity(finalReportSaveEntity);
        sections.add(section);
    }

    // Secondary
    if (entity.getSecondaryObject() != null && !entity.getSecondaryObject().isEmpty()) {
        Section section = new Section();
        section.setName(entity.getSecondaryObject());
        section.setColumns(col.getSecondary()); // USE CLIENT VALUES HERE
        section.setFinalReportSaveEntity(finalReportSaveEntity);
        sections.add(section);
    }

    // Tertiary
    if (entity.getTertiaryObject() != null && !entity.getTertiaryObject().isEmpty()) {
        Section section = new Section();
        section.setName(entity.getTertiaryObject());
        section.setColumns(col.getTertiary());  // USE CLIENT VALUES HERE
        section.setFinalReportSaveEntity(finalReportSaveEntity);
        sections.add(section);
    }

    // Set linked entities
    finalReportSaveEntity.setJoinQuery(joinEntities);
    finalReportSaveEntity.setSections(sections);

    finalReportSaveWithMetaDataReporitory.save(finalReportSaveEntity);

    return new ApiResponse(true, "Report saved");
}


    private List<String> getColumnNamesByTableName(String tableName) {
        System.out.println("Getting columns for: " + tableName);

        Class<?> entityClass;

        switch (tableName.toLowerCase()) {
            case "accounts" -> entityClass = Accounts.class;
            case "contact" -> entityClass = Contacts.class;
            case "opportunity", "opportunities" -> entityClass = Opportunity.class;
            default -> throw new IllegalArgumentException("Invalid table name: " + tableName);
        }

        return Arrays.stream(entityClass.getDeclaredFields())
                .filter(field -> !field.isAnnotationPresent(ManyToOne.class)
                        && !field.isAnnotationPresent(OneToMany.class))
                .map(Field::getName)
                .toList();
    }

    @Override
    public List<FinalReportResponse> getAllSavedReport() {
         try {

            List<FinalReportSaveEntity> finalReportSaveEntity = finalReportSaveWithMetaDataReporitory.findAll();

            List<FinalReportResponse> finalSaveDTOs = finalReportSaveEntity.stream()
                    .map(item -> modelMapper.map(item, FinalReportResponse.class)).toList();
            return finalSaveDTOs;

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
