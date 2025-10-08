package com.practice.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.demo.entity.Contacts;

public interface ContactRepository extends JpaRepository<Contacts,Long>{

    List<Contacts> findByContactAccountId(Long id);
    boolean existsByEmail(String email);

}
