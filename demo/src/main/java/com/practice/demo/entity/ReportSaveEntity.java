package com.practice.demo.entity;

import com.practice.demo.dto.FilterRequestDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Saved_Report")
public class ReportSaveEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String reportName;

    private String tableName;


    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String selectedColumnsJson;

    @Column(columnDefinition = "LONGTEXT")
    private String appliedFiltersJson;

}
