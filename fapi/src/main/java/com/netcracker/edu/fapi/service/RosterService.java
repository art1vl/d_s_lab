package com.netcracker.edu.fapi.service;

import com.netcracker.edu.fapi.models.RosterModel;
import com.netcracker.edu.fapi.models.RosterOrErrorsModel;

import java.util.List;

public interface RosterService {
    RosterOrErrorsModel save(RosterModel rosterModel);

    List findAll();

    void deleteRecord(String playerId);

    void editRecord(RosterModel rosterModel);

    RosterModel findRecord(String playerId);
}
