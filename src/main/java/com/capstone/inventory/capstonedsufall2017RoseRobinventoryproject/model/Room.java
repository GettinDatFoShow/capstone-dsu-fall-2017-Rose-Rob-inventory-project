package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;


import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.RoomHistory;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.RoomLocation;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private String id;

    @Column(name="number")
    private Integer number;

    @Column(name="name")
    private String name;

    @JoinColumn(name="building")
    @ManyToOne
    private Building building;

    @JoinColumn(name="items")
    @OneToMany
    private List<Item> items;

    @Column(name="last_updated")
    private String lastUpdated;

    @JoinColumn(name="courses")
    @ManyToMany
    private List<Course> courses;

    @JoinColumn(name="room_history")
    @OneToMany
    private List<RoomHistory> histories;

    @Column(name="nfc_code")
    private String nfcCode;

    @Column(name="latitude")
    private Long latitude;

    @Column(name="longitude")
    private Long longitude;

    @Column(name="created")
    private String created;

    public Room() {
    }

    public Room(Long latitude, Long longitude, Integer number, Building building, String created) {
        this.created = created;
        this.number = number;
        this.building = building;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public Room(String lastUpdated, Integer number, String created, String name, Building building, List<Item> items, List<Course> courses) {
        this.created = created;
        this.number = number;
        this.name = name;
        this.lastUpdated = lastUpdated;
        this.building = building;
        this.items = items;
        this.courses = courses;
    }

    public Room(Integer number, String name) {
        this.number = number;
        this.name = name;
    }

    public Room(Integer number, String name, Building building) {
        this.number = number;
        this.name = name;
        this.building = building;
    }



    public String getId() {
        return id;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public List<RoomHistory> getHistories() {
        return histories;
    }

    public void setHistories(List<RoomHistory> histories) {
        this.histories = histories;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumber() {
        return number;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Building getBuilding() {
        return building;
    }


    public void setBuilding(Building building) {
        this.building = building;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public String getNfcCode() {
        return nfcCode;
    }

    public void setNfcCode(String nfcCode) {
        this.nfcCode = nfcCode;
    }

    public Long getLatitude() {
        return latitude;
    }

    public void setLatitude(Long latitude) {
        this.latitude = latitude;
    }

    public Long getLongitude() {
        return longitude;
    }

    public void setLongitude(Long longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id='" + id + '\'' +
                ", number='" + number + '\'' +
                ", name='" + name + '\'' +
                ", items='" + items + '\'' +
                ", created=" + created +
                ", lastUpdated=" + lastUpdated +
                ", building='" + building + '\'' +
                ", courses='" + courses + '\'' +
                ", nfc_code='" + nfcCode + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", histories='" + histories +
                '}';
    }

}
