package com.practice.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.demo.entity.Opportunity;

public interface OpportunityRepository extends JpaRepository<Opportunity,Long> {
    List<Opportunity> findByOpportunityAccountId(Long id);
}
