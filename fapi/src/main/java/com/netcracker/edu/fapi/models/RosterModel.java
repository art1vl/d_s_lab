package com.netcracker.edu.fapi.models;

import lombok.Data;

import java.util.Date;

@Data
public class RosterModel {
    private String playerid;
    private Integer jersey;
    private String fname;
    private String sname;
    private String position;
    private Date birthday;
    private Integer weight;
    private Integer height;
    private String birthcity;
    private String birthstate;
}
