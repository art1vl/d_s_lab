package com.netcracker.edu.fapi.models;

import lombok.Data;

import java.util.Map;

@Data
public class RosterOrErrorsModel {
    private RosterModel rosterModel;
    private Map<String, String> errors;
    private String id;
    private String conditions;
}
