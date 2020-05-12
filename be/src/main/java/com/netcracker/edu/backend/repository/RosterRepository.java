package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entity.RosterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RosterRepository extends JpaRepository<RosterEntity, String> {
    RosterEntity findByPlayerid(String id);

    @Transactional
    void deleteByPlayerid(@Param("playerid") String playerId);
}
