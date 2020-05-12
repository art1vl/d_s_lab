package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entity.RosterEntity;

import java.util.List;

public interface RosterService {
    RosterEntity saveRoster(RosterEntity rosterEntity);

    boolean isExistById(String rosterId);

    List findAll();

    RosterEntity findRecord(String playerId);

    void deleteRecord(String playerId);

    void editRecord(RosterEntity rosterEntity);
}
