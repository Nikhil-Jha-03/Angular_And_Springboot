package com.practice.demo.dto;

import java.util.List;

import com.practice.demo.entity.JoinQueryEntity;
import com.practice.demo.entity.Section;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class FinalSaveDTO {
    
    private String name;
    private String apiName;
    private String primaryObject;
    private String secondaryObject;
    private String tertiaryObject;
    private List<JoinQueryDTO> joinQuery;

}
