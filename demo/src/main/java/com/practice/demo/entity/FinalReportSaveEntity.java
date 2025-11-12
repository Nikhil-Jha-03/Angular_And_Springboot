package com.practice.demo.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FinalReportSaveEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "api_name", nullable = false, unique = true)
    private String apiName;

    @Column(name = "primary_object", nullable = false)
    private String primaryObject;

    @Column(name = "secondary_object")
    private String secondaryObject;

    @Column(name = "tertiary_object")
    private String tertiaryObject;

    @Column(name = "join_query", columnDefinition = "TEXT")
    private String joinQuery;

    @OneToMany(mappedBy = "finalReportSaveEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Section> sections;
}
