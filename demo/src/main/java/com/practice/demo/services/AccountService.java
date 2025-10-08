package com.practice.demo.services;

import java.util.List;

import com.practice.demo.dto.AccountDTO;
import com.practice.demo.dto.AddAccountDTO;


public interface AccountService {


    List<AccountDTO> getAccount();
    AccountDTO createAccount(AddAccountDTO accountDTO);
    void deleteAccount(Long id);
    AddAccountDTO updateAccount(Long id, AddAccountDTO accountDTO);

}
