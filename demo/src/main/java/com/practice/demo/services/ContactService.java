package com.practice.demo.services;

import java.util.List;

import com.practice.demo.dto.AddContactDTO;
import com.practice.demo.dto.ContactDTO;

public interface ContactService {

    List<ContactDTO> getAllContact();

    List<ContactDTO> getContact(Long id);

    AddContactDTO createContact(Long id, AddContactDTO addContactDTO);

    AddContactDTO updateContact(Long id, AddContactDTO addContactDTO);

    void deleteContact(Long id);

}
