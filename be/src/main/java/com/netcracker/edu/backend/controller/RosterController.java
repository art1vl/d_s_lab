package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entity.RosterEntity;
import com.netcracker.edu.backend.service.RosterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.List;

@RestController
@RequestMapping("/api/roster")
public class RosterController {
    @Autowired
    RosterService rosterService;

    @GetMapping(value = "/exist/by/{id}")
    public ResponseEntity<Boolean> isExistById(@PathVariable("id") String rosterId) {
        return ResponseEntity.ok(rosterService.isExistById(rosterId));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List> findAll() {
        return ResponseEntity.ok(rosterService.findAll());
    }

    @PostMapping
    public ResponseEntity<RosterEntity> saveRoster(@RequestBody RosterEntity rosterEntity) {
        return ResponseEntity.ok(rosterService.saveRoster(rosterEntity));
    }
}
