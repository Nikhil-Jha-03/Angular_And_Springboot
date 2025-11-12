package com.practice.demo.dto;

import java.util.List;

import com.practice.demo.entity.Section;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class FinalSaveDTO {
    
    private String name;
    private String apiName;
    private String primaryObject;
    private String secondaryObject;
    private String tertiaryObject;
    private String joinQuery;

}
