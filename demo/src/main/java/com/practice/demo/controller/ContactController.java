package com.practice.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.demo.dto.AddContactDTO;
import com.practice.demo.dto.ContactDTO;
import com.practice.demo.services.ContactService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contact")
@CrossOrigin
public class ContactController {

    private final ContactService contactService;

    @GetMapping("/getallcontacts")
    public ResponseEntity<List<ContactDTO>> getAllContacts() {
        return ResponseEntity.ok().body(contactService.getAllContact());
    }

    @GetMapping("/getcontact/{id}")
    public ResponseEntity<List<ContactDTO>> getContact(@PathVariable Long id) {
        return ResponseEntity.ok().body(contactService.getContact(id));

    }

    @PostMapping("/createcontact/{id}")
    public ResponseEntity<AddContactDTO> createContact(@PathVariable Long id,
            @RequestBody AddContactDTO addContactDTO) {
        System.out.println("HERE 1");
        return ResponseEntity.ok().body(contactService.createContact(id, addContactDTO));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<AddContactDTO> updateContact(@PathVariable Long id,
            @RequestBody AddContactDTO addContactDTO) {

        return ResponseEntity.ok().body(contactService.updateContact(id, addContactDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok().build();
    }

}
