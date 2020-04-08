package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entity.LogInEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LogInRepository extends JpaRepository<LogInEntity, String> {
    LogInEntity findByEmail(@Param("email") String email);
}
