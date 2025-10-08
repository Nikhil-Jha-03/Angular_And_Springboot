package com.practice.demo.services.implementation;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.practice.demo.dto.AddContactDTO;
import com.practice.demo.dto.ContactDTO;
import com.practice.demo.entity.Accounts;
import com.practice.demo.entity.Contacts;
import com.practice.demo.payload.HandlevariousErrors;
import com.practice.demo.repository.AccountRepository;
import com.practice.demo.repository.ContactRepository;
import com.practice.demo.services.ContactService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactImplementation implements ContactService {
    private final ModelMapper modelMapper;
    private final ContactRepository contactRepository;
    private final AccountRepository accountRepository;

    public List<ContactDTO> getAllContact() {
        List<Contacts> contacts = contactRepository.findAll();
        // List<ContactDTO> contactDTO = contacts.stream()
        //         .map(newContact -> modelMapper.map(newContact , ContactDTO.class))
        //         .toList();
        // return modelMapper.map(contacts, ContactDTO.class)

        List<ContactDTO> contactDTO = contacts.stream()
        .map(contact -> {
            ContactDTO dto = new ContactDTO();
            dto.setId(contact.getId());
            dto.setFirstName(contact.getFirstName());
            dto.setLastName(contact.getLastName());
            dto.setEmail(contact.getEmail());
            dto.setContactAccount(contact.getContactAccount().getId());
            return dto;
        }).toList();
        return contactDTO;
    }

    // give the contact where the account id is passed thorught parameter
    public List<ContactDTO> getContact(Long id) {
        List<Contacts> contacts = contactRepository.findByContactAccountId(id);
        if (contacts.isEmpty()) {
            throw new HandlevariousErrors("No contacts found for account id " + id);
        }
        return contacts.stream()
                .map(contact -> modelMapper.map(contact, ContactDTO.class))
                .toList();
    }

    public AddContactDTO createContact(Long id, AddContactDTO addContactDTO) {
        try {
            Accounts account = accountRepository.findById(id)
                    .orElseThrow(() -> new HandlevariousErrors("Account not found with id: " + id));

            Contacts contact = modelMapper.map(addContactDTO, Contacts.class);

            contact.setContactAccount(account);
            account.getContact().add(contact);
            contactRepository.save(contact);

            return modelMapper.map(contact, AddContactDTO.class);
        } catch (Exception e) {
            throw new HandlevariousErrors("Something went wrong, Try again " + e.getMessage());
        }
    }

    @Override
    public AddContactDTO updateContact(Long id, AddContactDTO addContactDTO) {
        System.out.println("Hey");
        try {

            Contacts contacts = contactRepository.findById(id)
                    .orElseThrow(() -> new HandlevariousErrors("Contact Does Not exist"));

            String email = addContactDTO.getEmail();

            if (email != null && !email.isEmpty() && !email.equals(contacts.getEmail())
                    && contactRepository.existsByEmail(email)) {
                throw new HandlevariousErrors("Email already exists: " + email);
            } else if (email != null && !email.isEmpty()) {
                contacts.setEmail(email);
            }

            if (addContactDTO.getFirstName() != null && !addContactDTO.getFirstName().isEmpty()) {
                contacts.setFirstName(addContactDTO.getFirstName());
            }

            if (addContactDTO.getLastName() != null && !addContactDTO.getLastName().isEmpty()) {
                contacts.setLastName(addContactDTO.getLastName());
            }

            contactRepository.save(contacts);
            return modelMapper.map(contacts, AddContactDTO.class);

        } catch (Exception e) {
            throw new HandlevariousErrors("Something went wrong, Update Failed " + e.getMessage());
        }
    }

    @Override
    public void deleteContact(Long id) {
        System.out.println("Working");
        Contacts contact = contactRepository.findById(id)
                .orElseThrow(() -> new HandlevariousErrors("Contact with id " + id + " does not exist"));
          
        System.out.println(contact);
                
        contactRepository.deleteById(contact.getId());
    }

}
