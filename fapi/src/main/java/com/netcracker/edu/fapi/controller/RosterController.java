package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.RosterModel;
import com.netcracker.edu.fapi.models.RosterOrErrorsModel;
import com.netcracker.edu.fapi.service.RosterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roster")
public class RosterController {
    private RosterService rosterService;

    @Autowired
    public RosterController(RosterService rosterService) {
        this.rosterService = rosterService;
    }

    @Secured("ROLE_USER")
    @GetMapping(value = "/all")
    public ResponseEntity<List> findAll() {
        return ResponseEntity.ok(rosterService.findAll());
    }

    @PostMapping
    public ResponseEntity<RosterOrErrorsModel> saveRoster(@RequestBody RosterModel rosterModel) {
        return ResponseEntity.ok(rosterService.save(rosterModel));
    }
}