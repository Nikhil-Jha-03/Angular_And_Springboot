package com.practice.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.demo.entity.FinalReportSaveEntity;

public interface FinalReportSaveWithMetaDataReporitory extends JpaRepository<FinalReportSaveEntity, Long>  {

    Optional<FinalReportSaveEntity> findByApiName(String apiName);
    
    boolean existsByApiName(String apiName);

}
