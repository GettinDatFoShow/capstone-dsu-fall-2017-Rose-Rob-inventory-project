package model;

import model.misc.Course;
import model.misc.Department;
import model.person.Instructor;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class CourseTest {

    private Long aLong = 99L;
    private Integer number = 99;
    private String aString = "string";
    private Department department = new Department();
    private List<Instructor> instructors = new ArrayList<>();
    private Course course = new Course();
    private Course testCourse = new Course(aString, number, number, number, aString, department);

    @Test
    public void testConstructor(){
        Course testCourse2 = new Course(aString, number, number, number, aString, department);
        assertEquals(testCourse, testCourse2);
    }

    @Test
    public void getId() throws Exception {
        course.setId(aLong);
        assertEquals(aLong, course.getId());
    }

    @Test
    public void getName() throws Exception {
        course.setName(aString);
        assertEquals(aString, course.getName());
    }

    @Test
    public void getCrn() throws Exception {
        course.setCrn(number);
        assertEquals(number, course.getCrn());
    }

    @Test
    public void getNumber() throws Exception {
        course.setNumber(number);
        assertEquals(number, course.getNumber());
    }

    @Test
    public void getCredits() throws Exception {
        course.setCredits(number);
        assertEquals(number, course.getCredits());
    }

    @Test
    public void getLevel() throws Exception {
        course.setLevel(aString);
        assertEquals(aString, course.getLevel());
    }

    @Test
    public void getDepartment() throws Exception {
        course.setDepartment(department);
        assertEquals(department, course.getDepartment());
    }

    @Test
    public void getInstructors() throws Exception {
        course.setInstructors(instructors);
        assertEquals(instructors, course.getInstructors());
    }

}