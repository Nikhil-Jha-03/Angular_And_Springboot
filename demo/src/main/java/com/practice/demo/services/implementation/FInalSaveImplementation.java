package com.practice.demo.services.implementation;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.practice.demo.dto.FinalSaveDTO;
import com.practice.demo.dto.ReportResponseDTO;
import com.practice.demo.entity.Accounts;
import com.practice.demo.entity.Contacts;
import com.practice.demo.entity.FinalReportSaveEntity;
import com.practice.demo.entity.Opportunity;
import com.practice.demo.entity.Section;
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
    // private final SectionRepository sectionRepository;
    // private final AccountRepository accountRepository;
    // private final ContactRepository contactRepository;
    // private final OpportunityRepository opportunityRepository;
    // private final ObjectMapper objectMapper;

    @Override
    public ReportResponseDTO savereport(FinalSaveDTO entity) {

        System.out.println(entity);

        // Create FinalReportSaveEntity from DTO
        FinalReportSaveEntity finalReportSaveEntity = new FinalReportSaveEntity();
        finalReportSaveEntity.setName(entity.getName());
        finalReportSaveEntity.setApiName(entity.getApiName());
        finalReportSaveEntity.setPrimaryObject(entity.getPrimaryObject());
        finalReportSaveEntity.setSecondaryObject(entity.getSecondaryObject());
        finalReportSaveEntity.setTertiaryObject(entity.getTertiaryObject());
        finalReportSaveEntity.setJoinQuery(entity.getJoinQuery());

        // Create sections dynamically based on which objects are provided
        List<Section> sections = new ArrayList<>();

        // --- Primary Object Section ---
        if (entity.getPrimaryObject() != null && !entity.getPrimaryObject().isEmpty()) {
            List<String> columns = getColumnNamesByTableName(entity.getPrimaryObject());

            Section section = new Section();
            section.setName(entity.getPrimaryObject());
            section.setColumns(columns);
            section.setFinalReportSaveEntity(finalReportSaveEntity);
            sections.add(section);
        }

        // --- Secondary Object Section ---
        if (entity.getSecondaryObject() != null && !entity.getSecondaryObject().isEmpty()) {
            List<String> columns = getColumnNamesByTableName(entity.getSecondaryObject());

            Section section = new Section();
            section.setName(entity.getSecondaryObject());
            section.setColumns(columns);
            section.setFinalReportSaveEntity(finalReportSaveEntity);
            sections.add(section);
        }

        // --- Tertiary Object Section ---
        if (entity.getTertiaryObject() != null && !entity.getTertiaryObject().isEmpty()) {
            List<String> columns = getColumnNamesByTableName(entity.getTertiaryObject());

            Section section = new Section();
            section.setName(entity.getTertiaryObject());
            section.setColumns(columns);
            section.setFinalReportSaveEntity(finalReportSaveEntity);

            sections.add(section);
        }

        System.out.println("Section ::::::: " + sections);
        System.out.println("MAIN DATA ::::::: " + finalReportSaveEntity);

        // Step 3: Link sections back to parent report
        finalReportSaveEntity.setSections(sections);

        // Step 4: Save (cascade saves sections automatically)
        finalReportSaveWithMetaDataReporitory.save(finalReportSaveEntity);
        return null;
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
}
