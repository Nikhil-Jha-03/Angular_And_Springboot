package com.practice.demo.dto;

import lombok.Data;

@Data
public class JoinQueryDTO {
 private String id;
    private String fromObject;
    private String fromField;
    private String toObject;
    private String toField;
    private String joinType;
}
