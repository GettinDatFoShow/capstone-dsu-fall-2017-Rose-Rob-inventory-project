package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Organization")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="organization_id")
    private String id;

    @Column(name="name")
    private String name;

    @JoinColumn(name="address")
    @OneToOne
    private Address address;

    @Column(name="type")
    private String type;

    @JoinColumn(name="buildings")
    @OneToMany
    private List<Building> buildings;

    public Organization() {
    }

    public Organization(String name, Address address, String type) {
        this.name = name;
        this.address = address;
        this.type = type;
    }

    public Organization(String name, Address address, String type, List<Building> buildings) {
        this.name = name;
        this.address = address;
        this.type = type;
        this.buildings = buildings;
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

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Building> getBuildings() {
        return buildings;
    }

    public void setBuildings(List<Building> buildings) {
        this.buildings = buildings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Organization that = (Organization) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (address != null ? !address.equals(that.address) : that.address != null) return false;
        if (type != null ? !type.equals(that.type) : that.type != null) return false;
        return buildings != null ? buildings.equals(that.buildings) : that.buildings == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (buildings != null ? buildings.hashCode() : 0);
        return result;
    }
}
