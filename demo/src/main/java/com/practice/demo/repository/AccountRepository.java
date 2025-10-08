package com.practice.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.demo.entity.Accounts;

public interface AccountRepository extends JpaRepository<Accounts,Long>{}
