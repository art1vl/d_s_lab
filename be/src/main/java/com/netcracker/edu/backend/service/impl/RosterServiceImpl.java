package com.netcracker.edu.backend.service.impl;

import com.netcracker.edu.backend.entity.RosterEntity;
import com.netcracker.edu.backend.repository.RosterRepository;
import com.netcracker.edu.backend.service.RosterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RosterServiceImpl implements RosterService {
    @Autowired
    RosterRepository rosterRepository;

    @Override
    public RosterEntity saveRoster(RosterEntity rosterEntity) {
        return rosterRepository.save(rosterEntity);
    }

    @Override
    public boolean isExistById(String rosterId) {
        return rosterRepository.existsById(rosterId);
    }

    @Override
    public List findAll() {
        List<RosterEntity> arrayList = rosterRepository.findAll();
        return arrayList;
    }
}
