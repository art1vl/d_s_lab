package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.RosterModel;
import com.netcracker.edu.fapi.models.RosterOrErrorsModel;
import com.netcracker.edu.fapi.service.RosterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Secured({"ROLE_USER", "ROLE_MODER", "ROLE_ADMIN"})
    @GetMapping(value = "/all")
    public ResponseEntity<List> findAll() {
        return ResponseEntity.ok(rosterService.findAll());
    }

    @Secured("ROLE_MODER")
    @GetMapping(value = "/{playerId}")
    public ResponseEntity<RosterModel> findRecord(@PathVariable("playerId") String playerId) {
        return ResponseEntity.ok(rosterService.findRecord(playerId));
    }

    @Secured("ROLE_ADMIN")
    @PostMapping
    public ResponseEntity<RosterOrErrorsModel> saveRoster(@RequestBody RosterModel rosterModel) {
        return ResponseEntity.ok(rosterService.save(rosterModel));
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping(value = "/{playerId}")
    public HttpStatus deleteRecord(@PathVariable("playerId") String playerId) {
        rosterService.deleteRecord(playerId);
        return HttpStatus.OK;
    }

    @Secured("ROLE_MODER")
    @PutMapping(value = "/edit")
    public HttpStatus editRecord(@RequestBody RosterModel rosterModel) {
        rosterService.editRecord(rosterModel);
        return HttpStatus.OK;
    }
}