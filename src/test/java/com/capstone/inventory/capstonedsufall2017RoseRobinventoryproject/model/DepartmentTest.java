package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class DepartmentTest {

    private Long aLong = 99L;
    private String aString = "string";
    private List<Course> courses = new ArrayList<>();
    private Department department = new Department();
    private Department testDepartment = new Department(aString, courses);

    @Test
    public void testConstructor(){
        Department testDepartment2 = new Department(aString, courses);
        assertEquals(testDepartment, testDepartment2);
    }

    @Test
    public void getId() throws Exception {
        department.setId(aLong);
        assertEquals(aLong, department.getId());
    }

    @Test
    public void getName() throws Exception {
        department.setName(aString);
        assertEquals(aString, department.getName());
    }

    @Test
    public void getCourses() throws Exception {
        department.setCourses(courses);
        assertEquals(courses, department.getCourses());
    }

}