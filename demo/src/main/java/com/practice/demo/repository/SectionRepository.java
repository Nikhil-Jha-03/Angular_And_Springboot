package com.practice.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.demo.entity.Section;

public interface SectionRepository extends JpaRepository<Section,Long> {}
