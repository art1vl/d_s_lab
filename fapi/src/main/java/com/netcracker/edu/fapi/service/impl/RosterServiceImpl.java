package com.netcracker.edu.fapi.service.impl;

import com.netcracker.edu.fapi.models.RosterModel;
import com.netcracker.edu.fapi.models.RosterOrErrorsModel;
import com.netcracker.edu.fapi.service.RosterService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class RosterServiceImpl implements RosterService {
    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public RosterOrErrorsModel save(RosterModel rosterModel) {
        RosterOrErrorsModel rosterOrErrorsModel = new RosterOrErrorsModel();
        RestTemplate restTemplate = new RestTemplate();
        if (isRosterIdBusy(rosterModel.getPlayerid())) {
            rosterOrErrorsModel.setId("This playerid is busy");
            return rosterOrErrorsModel;
        }
        if (!isRosterSatisfiesConditions(rosterModel)) {
            rosterOrErrorsModel.setConditions("This player doesn't satisfy the conditions");
            return rosterOrErrorsModel;
        }
        rosterOrErrorsModel.setRosterModel(restTemplate
                .postForEntity(backendServerUrl + "/api/roster", rosterModel, RosterModel.class)
                .getBody());
        return rosterOrErrorsModel;
    }

    @Override
    public List findAll() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/roster/all", List.class);
    }

    private boolean isRosterIdBusy(String rosterId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/roster/exist/by/" + rosterId, Boolean.class);
    }

    private boolean isRosterSatisfiesConditions(RosterModel rosterModel) {
        Calendar calendarBirth = new GregorianCalendar();
        calendarBirth.setTime(rosterModel.getBirthday());
        int year = calendarBirth.get(Calendar.YEAR);
        Calendar calendarNow = new GregorianCalendar();
        Date dateNow = Date.valueOf(LocalDate.now());
        calendarNow.setTime(dateNow);
        int yearNow = calendarNow.get(Calendar.YEAR);
        int difference = yearNow - year;
        System.out.println(difference);
        if (difference < 20 && rosterModel.getHeight() < 170 && rosterModel.getWeight() > 80) {
            return false;
        }
        if (difference > 20 && difference < 30 && rosterModel.getHeight() < 190 && rosterModel.getWeight() > 100) {
            return false;
        }
        return true;
    }
}
