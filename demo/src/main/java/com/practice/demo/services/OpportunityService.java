package com.practice.demo.services;

import java.util.List;

import com.practice.demo.dto.AddOpportunityDTO;
import com.practice.demo.dto.OpportunityDTO;

public interface OpportunityService {

    List<OpportunityDTO> getAllOpportunity();

    List<OpportunityDTO> getOpportunity(Long accountId);

    AddOpportunityDTO createOpportunity(Long accountId, AddOpportunityDTO addOpportunityDTO);

    AddOpportunityDTO updateOpportunity(Long id, AddOpportunityDTO addOpportunityDTO);

    void deleteOpportunity(Long id);
 
}