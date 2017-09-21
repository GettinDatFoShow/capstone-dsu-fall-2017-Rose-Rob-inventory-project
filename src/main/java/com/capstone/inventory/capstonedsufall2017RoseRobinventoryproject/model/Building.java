package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Building")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="building_id")
    private Long id;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Building building = (Building) o;

        if (id != null ? !id.equals(building.id) : building.id != null) return false;
        if (number != null ? !number.equals(building.number) : building.number != null) return false;
        if (name != null ? !name.equals(building.name) : building.name != null) return false;
        if (rooms != null ? !rooms.equals(building.rooms) : building.rooms != null) return false;
        if (departments != null ? !departments.equals(building.departments) : building.departments != null)
            return false;
        return organization != null ? organization.equals(building.organization) : building.organization == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (rooms != null ? rooms.hashCode() : 0);
        result = 31 * result + (departments != null ? departments.hashCode() : 0);
        result = 31 * result + (organization != null ? organization.hashCode() : 0);
        return result;
    }
}
