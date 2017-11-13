package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;


import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.RoomHistory;

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

    @Column(name="special_code")
    private String specialCode;

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

    @JoinColumn(name="courses")
    @ManyToMany
    private List<Course> courses;

    @JoinColumn(name="history")
    @OneToMany
    private List<RoomHistory> roomHistory;

    @Column(name="nfc_code")
    private String nfcCode;

    @Column(name="geo_location")
    private String geoLocation;

    public Room() {
    }

    public Room(String specialCode, Integer number, Building building) {
        this.specialCode = specialCode;
        this.number = number;
        this.building = building;
    }

    public Room(Integer number, String name, Building building, List<Item> items, List<Course> courses) {
        this.number = number;
        this.name = name;
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

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Building getBuilding() {
        return building;
    }

    public String getSpecialCode() {
        return specialCode;
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

    public List<RoomHistory> getRoomHistory() {
        return roomHistory;
    }

    public void setRoomHistory(List<RoomHistory> roomHistory) {
        this.roomHistory = roomHistory;
    }

    public String getNfcCode() {
        return nfcCode;
    }

    public void setNfcCode(String nfcCode) {
        this.nfcCode = nfcCode;
    }

    public String getGeoLocation() {
        return geoLocation;
    }

    public void setGeoLocation(String geoLocation) {
        this.geoLocation = geoLocation;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id='" + id + '\'' +
                ", specialCode='" + specialCode + '\'' +
                ", number='" + number + '\'' +
                ", name='" + name + '\'' +
                ", items='" + items + '\'' +
                ", building='" + building + '\'' +
                ", courses='" + courses + '\'' +
                ", history='" + roomHistory + '\'' +
                ", nfc_code='" + nfcCode + '\'' +
                ", geo_location='" + geoLocation + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Room room = (Room) o;

        if (id != null ? !id.equals(room.id) : room.id != null) return false;
        if (number != null ? !number.equals(room.number) : room.number != null) return false;
        if (name != null ? !name.equals(room.name) : room.name != null) return false;
        if (building != null ? !building.equals(room.building) : room.building != null) return false;
        if (items != null ? !items.equals(room.items) : room.items != null) return false;
        if (courses != null ? !courses.equals(room.courses) : room.courses != null) return false;
        if (roomHistory != null ? !roomHistory.equals(room.roomHistory) : room.roomHistory != null) return false;
        if (nfcCode != null ? !nfcCode.equals(room.nfcCode) : room.nfcCode != null) return false;
        return geoLocation != null ? geoLocation.equals(room.geoLocation) : room.geoLocation == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (building != null ? building.hashCode() : 0);
        result = 31 * result + (items != null ? items.hashCode() : 0);
        result = 31 * result + (courses != null ? courses.hashCode() : 0);
        result = 31 * result + (roomHistory != null ? roomHistory.hashCode() : 0);
        result = 31 * result + (nfcCode != null ? nfcCode.hashCode() : 0);
        result = 31 * result + (geoLocation != null ? geoLocation.hashCode() : 0);
        return result;
    }
}
