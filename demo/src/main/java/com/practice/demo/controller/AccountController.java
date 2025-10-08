package com.practice.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import com.practice.demo.dto.AccountDTO;
import com.practice.demo.dto.AddAccountDTO;

import com.practice.demo.services.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("account")
@CrossOrigin
public class AccountController {
    @Autowired
    private final AccountService accountService;

    @GetMapping("/allaccount")
    public ResponseEntity<List<AccountDTO>> getMethodName() {
        return ResponseEntity.ok().body(accountService.getAccount());
    }

    @PostMapping("/create")
    public ResponseEntity<AccountDTO> addAccount(@RequestBody @Valid AddAccountDTO accountDTO ) {
        return ResponseEntity.ok().body(accountService.createAccount(accountDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        System.out.println(id);
        accountService.deleteAccount(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AddAccountDTO> updateAccount(@PathVariable Long id, @RequestBody AddAccountDTO accountDTO) {
        return ResponseEntity.ok().body(accountService.updateAccount(id,accountDTO));
    }
    
}
