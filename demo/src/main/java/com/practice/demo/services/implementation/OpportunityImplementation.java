package com.practice.demo.services.implementation;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.practice.demo.dto.AddOpportunityDTO;
import com.practice.demo.dto.OpportunityDTO;
import com.practice.demo.entity.Accounts;
import com.practice.demo.entity.Opportunity;
import com.practice.demo.payload.HandlevariousErrors;
import com.practice.demo.repository.AccountRepository;
import com.practice.demo.repository.OpportunityRepository;
import com.practice.demo.services.OpportunityService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpportunityImplementation implements OpportunityService {

    private final ModelMapper modelMapper;
    private final OpportunityRepository opportunityRepository;
    private final AccountRepository accountRepository;

    @Override
    public List<OpportunityDTO> getAllOpportunity() {
        List<Opportunity> opportunities = opportunityRepository.findAll();

        List<OpportunityDTO> opportunityDTOs = opportunities.stream()
                .map(opportunity -> modelMapper.map(opportunity, OpportunityDTO.class))
                .toList();

        System.out.println(opportunityDTOs);
        return opportunityDTOs;
    }

    @Override
    public List<OpportunityDTO> getOpportunity(Long accountId) {
        List<Opportunity> opportunities = opportunityRepository.findByOpportunityAccountId(accountId);

        if (opportunities.isEmpty()) {
            throw new HandlevariousErrors("No opportunities found for account id " + accountId);
        }

        // Map each Opportunity entity to OpportunityDTO
        return opportunities.stream()
                .map(opportunity -> modelMapper.map(opportunity, OpportunityDTO.class))
                .toList();
    }

    @Override
    public AddOpportunityDTO createOpportunity(Long accountId, AddOpportunityDTO addOpportunityDTO) {
        try {
            System.out.println(addOpportunityDTO);
            Accounts account = accountRepository.findById(accountId)
                    .orElseThrow(() -> new HandlevariousErrors("Account not found with id: " + accountId));

            Opportunity opportunity = modelMapper.map(addOpportunityDTO, Opportunity.class);

            opportunity.setOpportunityAccount(account);
            ;
            account.getOpportunity().add(opportunity);

            opportunityRepository.save(opportunity);
            return modelMapper.map(opportunity, AddOpportunityDTO.class);

        } catch (Exception e) {
            throw new HandlevariousErrors("Something went wrong, Try again: " + e.getMessage());
        }
    }

    @Override
    public AddOpportunityDTO updateOpportunity(Long id, AddOpportunityDTO addOpportunityDTO) {
        try {
            Opportunity opportunity = opportunityRepository.findById(id)
                    .orElseThrow(() -> new HandlevariousErrors("Opportunity does not exist"));

            if (addOpportunityDTO.getName() != null && !addOpportunityDTO.getName().isEmpty()) {
                opportunity.setName(addOpportunityDTO.getName());
            }

            if (addOpportunityDTO.getStage() != null && !addOpportunityDTO.getStage().isEmpty()) {
                opportunity.setStage(addOpportunityDTO.getStage());
            }

            if (addOpportunityDTO.getAmount() != null) {
                opportunity.setAmount(addOpportunityDTO.getAmount());
            }

            // check if the update date is of past
            if (addOpportunityDTO.getCloseDate() != null) {
                if (addOpportunityDTO.getCloseDate().isBefore(LocalDate.now())) {
                    throw new HandlevariousErrors("Close date must be today or in the future");
                }
                opportunity.setCloseDate(addOpportunityDTO.getCloseDate());
            }

            opportunityRepository.save(opportunity);

            return modelMapper.map(opportunity, AddOpportunityDTO.class);

        } catch (Exception e) {
            throw new HandlevariousErrors("Something went wrong, Update Failed: " + e.getMessage());
        }
    }

    @Override
    public void deleteOpportunity(Long id) {
        System.out.println("Deleting Opportunity with id: " + id);

        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new HandlevariousErrors("Opportunity with id " + id + " does not exist"));

        System.out.println(opportunity);

        opportunityRepository.deleteById(opportunity.getId());
    }

}
