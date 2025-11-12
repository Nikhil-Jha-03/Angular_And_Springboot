package com.practice.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.demo.entity.FinalReportSaveEntity;

public interface FinalReportSaveWithMetaDataReporitory extends JpaRepository<FinalReportSaveEntity, Long>  {}
