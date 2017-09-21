package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class BuildingTest {

    private Long aLong = 99L;
    private Integer number = 99;
    private String aString = "string";
    private List<Room> rooms = new ArrayList<>();
    private List<Department> departments = new ArrayList<>();
    private Organization organization = new Organization();
    private Building building = new Building();
    private Building testBuilding = new Building(number, aString, rooms, departments, organization);

    @Test
    public void testConstructor(){
        Building testBuilding2 = new Building(number, aString, rooms, departments, organization);
        assertEquals(testBuilding, testBuilding2);
    }

    @Test
    public void getId() throws Exception {
        building.setId(aLong);
        assertEquals(aLong, building.getId());
    }

    @Test
    public void getNumber() throws Exception {
        building.setNumber(number);
        assertEquals(number, building.getNumber());
    }

    @Test
    public void getName() throws Exception {
        building.setName(aString);
        assertEquals(aString, building.getName());
    }

    @Test
    public void getRooms() throws Exception {
        building.setRooms(rooms);
        assertEquals(rooms, building.getRooms());
    }

    @Test
    public void getDepartments() throws Exception {
        building.setDepartments(departments);
        assertEquals(departments, building.getDepartments());
    }

    @Test
    public void getOrganization() throws Exception {
        building.setOrganization(organization);
        assertEquals(organization, building.getOrganization());
    }

}