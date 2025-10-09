package com.practice.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.demo.entity.ReportColumn;

public interface ReportColumnRepository extends JpaRepository<ReportColumn,Long> {
    List<ReportColumn> findByReportTypeId(Long reportTypeId);
}
