package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;


import javax.persistence.*;
import java.util.List;

@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

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
    @OneToMany
    private List<Course> courses;

    public Room() {
    }

    public Room(Integer number, Building building) {
        this.number = number;
        this.building = building;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
        return courses != null ? courses.equals(room.courses) : room.courses == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (building != null ? building.hashCode() : 0);
        result = 31 * result + (items != null ? items.hashCode() : 0);
        result = 31 * result + (courses != null ? courses.hashCode() : 0);
        return result;
    }
}
