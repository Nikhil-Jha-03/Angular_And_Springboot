package com.practice.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.demo.entity.ReportSaveEntity;

public interface ReportSaveRepository extends JpaRepository<ReportSaveEntity,Long> {}
