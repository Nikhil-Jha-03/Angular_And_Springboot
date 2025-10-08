package com.practice.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.demo.dto.AddOpportunityDTO;
import com.practice.demo.dto.OpportunityDTO;
import com.practice.demo.repository.OpportunityRepository;
import com.practice.demo.services.OpportunityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/opportunity")
@RequiredArgsConstructor
@CrossOrigin
public class OpportunityController {

    public final OpportunityRepository opportunityRepository;
    public final OpportunityService opportunityService;

    @GetMapping("/getallopportunity")
    public ResponseEntity<List<OpportunityDTO>> getAllOpportunity() {
        return ResponseEntity.ok(opportunityService.getAllOpportunity());
    }

    // Get contacts for a specific account by accountId
    @GetMapping("/getopportunity/{accountId}")
    public ResponseEntity<List<OpportunityDTO>> getOpportunityByAccount(@PathVariable Long accountId) {
        return ResponseEntity.ok(opportunityService.getOpportunity(accountId));
    }

    @PostMapping("/createopportunity/{accountId}")
    public ResponseEntity<AddOpportunityDTO> createOpportunity(@PathVariable Long accountId,
            @RequestBody AddOpportunityDTO addOpportunityDTO) {
                System.out.println(addOpportunityDTO);
        return ResponseEntity.ok(opportunityService.createOpportunity(accountId, addOpportunityDTO));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AddOpportunityDTO> updateContact(@PathVariable Long id,
            @RequestBody AddOpportunityDTO addOpportunityDTO) {
        return ResponseEntity.ok(opportunityService.updateOpportunity(id, addOpportunityDTO));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        opportunityService.deleteOpportunity(id);
        return ResponseEntity.ok().build();
}
}
