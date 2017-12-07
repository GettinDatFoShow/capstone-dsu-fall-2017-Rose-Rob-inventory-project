package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Building")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="building_id")
    private String id;

    @Column(name="number")
    private Integer number;

    @Column(name="name")
    private String name;

    @JoinColumn(name="rooms")
    @OneToMany
    private List<Room> rooms;

    @JoinColumn(name="departments")
    @OneToMany
    private List<Department> departments;

    @JoinColumn(name="organization")
    @ManyToOne
    private Organization organization;

    public Building() {
    }

    public Building(Integer number, String name, List<Room> rooms, List<Department> departments, Organization organization) {
        this.number = number;
        this.name = name;
        this.rooms = rooms;
        this.departments = departments;
        this.organization = organization;
    }

    public Building(Integer number, String name) {
        this.number = number;
        this.name = name;
    }

    public String getId() {

        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    @Override
    public String toString() {
        return "Building{" +
                "id='" + id + '\'' +
                ", number=" + number +
                ", name='" + name + '\'' +
                '}';
    }
}
