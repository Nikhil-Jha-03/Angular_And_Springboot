package com.practice.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.demo.entity.FilterEntity;

public interface FilterRepository extends JpaRepository<FilterEntity,Integer> {}
