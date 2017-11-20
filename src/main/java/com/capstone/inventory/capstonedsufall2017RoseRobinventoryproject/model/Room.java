package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;


import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;
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

    @Column(name="last_updated")
    private String lastUpdated;

    @JoinColumn(name="room_details")
    @OneToMany
    private List<Detail> details;

    @JoinColumn(name="courses")
    @ManyToMany
    private List<Course> courses;

    @JoinColumn(name="room_history")
    @OneToMany
    private List<RoomHistory> histories;

    @Column(name="nfc_code")
    private String nfcCode;

    @Column(name="room_location")
    private String roomlocation;

    @Column(name="created")
    private String created;

    public Room() {
    }

    public Room(String roomlocation, List<Detail> details, String specialCode, Integer number, Building building, String created) {
        this.specialCode = specialCode;
        this.created = created;
        this.number = number;
        this.building = building;
        this.details = details;
        this.roomlocation = roomlocation;
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

    public List<Detail> getDetails() {
        return details;
    }

    public void setDetails(List<Detail> details) {
        this.details = details;
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

    public String getNfcCode() {
        return nfcCode;
    }

    public void setNfcCode(String nfcCode) {
        this.nfcCode = nfcCode;
    }

    public void setRoomlocation() {
        this.roomlocation = roomlocation;
    }

    public String getroomlocation() {
        return roomlocation;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id='" + id + '\'' +
                ", specialCode='" + specialCode + '\'' +
                ", number='" + number + '\'' +
                ", name='" + name + '\'' +
                ", items='" + items + '\'' +
                ", created=" + created +
                ", lastUpdated=" + lastUpdated +
                ", building='" + building + '\'' +
                ", courses='" + courses + '\'' +
                ", nfc_code='" + nfcCode + '\'' +
                ", details=" + details +
                ", roomlocation='" + roomlocation + '\'' +
                ", histories='" + histories +
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
        if (histories != null ? !histories.equals(room.histories) : room.histories != null) return false;
        if (lastUpdated != null ? !lastUpdated.equals(room.lastUpdated) : room.lastUpdated != null) return false;
        if (created != null ? !created.equals(room.created) : room.created != null) return false;
        if (details != null ? !details.equals(room.details) : room.details != null) return false;
        if (nfcCode != null ? !nfcCode.equals(room.nfcCode) : room.nfcCode != null) return false;
        return roomlocation != null ? roomlocation.equals(room.roomlocation) : room.roomlocation == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (created != null ? created.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (building != null ? building.hashCode() : 0);
        result = 31 * result + (items != null ? items.hashCode() : 0);
        result = 31 * result + (details != null ? details.hashCode() : 0);
        result = 31 * result + (histories != null ? histories.hashCode() : 0);
        result = 31 * result + (courses != null ? courses.hashCode() : 0);
        result = 31 * result + (lastUpdated != null ? lastUpdated.hashCode() : 0);
        result = 31 * result + (nfcCode != null ? nfcCode.hashCode() : 0);
        result = 31 * result + (roomlocation != null ? roomlocation.hashCode() : 0);
        return result;
    }
}
