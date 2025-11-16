package com.practice.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class JoinQueryEntity {

    @Id
    private String id;
    private String fromObject;
    private String fromField;
    private String toObject;
    private String toField;
    private String joinType;

    @ManyToOne
    @JoinColumn(columnDefinition = "final_report_id")
    private FinalReportSaveEntity finalReportSaveEntity;

}
