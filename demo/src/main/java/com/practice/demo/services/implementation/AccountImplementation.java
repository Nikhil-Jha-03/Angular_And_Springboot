package com.practice.demo.services.implementation;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.practice.demo.dto.AccountDTO;
import com.practice.demo.dto.AddAccountDTO;
import com.practice.demo.entity.Accounts;
import com.practice.demo.payload.HandlevariousErrors;
import com.practice.demo.repository.AccountRepository;
import com.practice.demo.services.AccountService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountImplementation implements AccountService {

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;

    // With ModelMapper
    @Override
    public List<AccountDTO> getAccount() {
        List<Accounts> accounts = accountRepository.findAll();
        if (accounts.isEmpty()) {
            throw new IllegalArgumentException("No Data Available");
        }
        // List<AccountDTO> accountDTO = modelMapper.map(accounts, AccountDTO.class);
        List<AccountDTO> accountDTO = accounts.stream()
                .map(newaccounts -> modelMapper.map(newaccounts, AccountDTO.class))
                .toList();
        return accountDTO;
    }

    // Without ModelMapper
    // @Override
    // public List<AccountDTO> getAccount(){
    // List<Accounts> accounts = accountRepository.findAll();
    // if (accounts.isEmpty()) {
    // throw new IllegalArgumentException("Not Data Available");
    // }
    // List<AccountDTO> accountDTO = accounts
    // .stream()
    // .map(account -> new
    // AccountDTO(account.getId(),account.getName(),account.getIndustry(),account.getAnnualRevenue(),
    // null, null)).toList();
    // return accountDTO;
    // }

    @Override
    public AccountDTO createAccount(AddAccountDTO accountDTO) {
        Accounts accounts = modelMapper.map(accountDTO, Accounts.class);

        if (accountDTO.getName() == null || accountDTO.getName().trim().isEmpty()) {
            throw new HandlevariousErrors("Account name cannot be empty");
        }
        accountRepository.save(accounts);
        return modelMapper.map(accounts, AccountDTO.class);
    }

    @Override
    public void deleteAccount(Long id) {
        System.out.println("In Delete");
        if (!accountRepository.existsById(id)) {
            throw new HandlevariousErrors("Account with the id : " + " does not exist");
        }
        accountRepository.deleteById(id);
    }

    @Override
    public AddAccountDTO updateAccount(Long id, AddAccountDTO accountDTO) {

        Accounts accounts = accountRepository.findById(id)
                .orElseThrow(() -> new HandlevariousErrors("Account with the id : " + " does not exist"));
        modelMapper.map(accountDTO, Accounts.class);

        if (accountDTO.getName() != null) {
            accounts.setName(accountDTO.getName());
        }
        if (accountDTO.getIndustry() != null) {
            accounts.setIndustry(accountDTO.getIndustry());
        }
        if (accountDTO.getAnnualRevenue() != null) {
            accounts.setAnnualRevenue(accountDTO.getAnnualRevenue());
        }

        accountRepository.save(accounts);
        return modelMapper.map(accounts, AddAccountDTO.class);

    }

}
