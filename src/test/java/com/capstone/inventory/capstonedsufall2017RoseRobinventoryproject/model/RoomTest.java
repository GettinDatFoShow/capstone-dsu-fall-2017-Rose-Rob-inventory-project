package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class RoomTest {

    private Long aLong = 99L;
    private String aString = "string";
    private Integer number = 99;
    private Building building = new Building();
    private List<Item> items = new ArrayList<>();
    private List<Course> courses = new ArrayList<>();
    private Room room = new Room();
    private Room testRoom = new Room(number, building);

    @Test
    public void testConstructor(){
        Room testRoom2 = new Room(number, building);
        assertEquals(testRoom, testRoom2);
    }

    @Test
    public void getId() throws Exception {
        room.setId(aLong);
        assertEquals(aLong, room.getId());
    }

    @Test
    public void getName() throws Exception {
        room.setName(aString);
        assertEquals(aString, room.getName());
    }

    @Test
    public void getNumber() throws Exception {
        room.setNumber(number);
        assertEquals(number, room.getNumber());
    }

    @Test
    public void getBuilding() throws Exception {
        room.setBuilding(building);
        assertEquals(building, room.getBuilding());
    }

    @Test
    public void getItems() throws Exception {
        room.setItems(items);
        assertEquals(items, room.getItems());
    }

    @Test
    public void getCourses() throws Exception {
        room.setCourses(courses);
        assertEquals(courses, room.getCourses());
    }

}