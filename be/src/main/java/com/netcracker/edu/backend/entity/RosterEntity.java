package com.netcracker.edu.backend.entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "roster", schema = "my_app", catalog = "")
public class RosterEntity {
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

    @Id
    @Column(name = "playerid")
    public String getPlayerid() {
        return playerid;
    }

    public void setPlayerid(String playerid) {
        this.playerid = playerid;
    }

    @Basic
    @Column(name = "jersey")
    public Integer getJersey() {
        return jersey;
    }

    public void setJersey(Integer jersey) {
        this.jersey = jersey;
    }

    @Basic
    @Column(name = "fname")
    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    @Basic
    @Column(name = "sname")
    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    @Basic
    @Column(name = "position")
    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    @Basic
    @Column(name = "birthday")
    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    @Basic
    @Column(name = "weight")
    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    @Basic
    @Column(name = "height")
    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    @Basic
    @Column(name = "birthcity")
    public String getBirthcity() {
        return birthcity;
    }

    public void setBirthcity(String birthcity) {
        this.birthcity = birthcity;
    }

    @Basic
    @Column(name = "birthstate")
    public String getBirthstate() {
        return birthstate;
    }

    public void setBirthstate(String birthstate) {
        this.birthstate = birthstate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RosterEntity that = (RosterEntity) o;
        return Objects.equals(playerid, that.playerid) &&
                Objects.equals(jersey, that.jersey) &&
                Objects.equals(fname, that.fname) &&
                Objects.equals(sname, that.sname) &&
                Objects.equals(position, that.position) &&
                Objects.equals(birthday, that.birthday) &&
                Objects.equals(weight, that.weight) &&
                Objects.equals(height, that.height) &&
                Objects.equals(birthcity, that.birthcity) &&
                Objects.equals(birthstate, that.birthstate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerid, jersey, fname, sname, position, birthday, weight, height, birthcity, birthstate);
    }
}
