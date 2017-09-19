package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person.Instructor;

import javax.persistence.*;
import java.util.List;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Integer crn;
    private Integer number;
    private Integer credits;
    private String level;

    @JoinColumn
    @ManyToOne
    private Instructor instructor;

    @JoinColumn
    @ManyToOne
    private Department department;

    @JoinColumn
    @ManyToMany
    private List<Instructor> instructors;

    public Course() {
    }

    public Course(String name, Integer crn, Integer number, Integer credits, String level, Department department) {
        this.name = name;
        this.crn = crn;
        this.number = number;
        this.credits = credits;
        this.level = level;
        this.department = department;
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

    public Integer getCrn() {
        return crn;
    }

    public void setCrn(Integer crn) {
        this.crn = crn;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<Instructor> getInstructors() {
        return instructors;
    }

    public void setInstructors(List<Instructor> instructors) {
        this.instructors = instructors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Course course = (Course) o;

        if (id != null ? !id.equals(course.id) : course.id != null) return false;
        if (name != null ? !name.equals(course.name) : course.name != null) return false;
        if (crn != null ? !crn.equals(course.crn) : course.crn != null) return false;
        if (number != null ? !number.equals(course.number) : course.number != null) return false;
        if (credits != null ? !credits.equals(course.credits) : course.credits != null) return false;
        if (level != null ? !level.equals(course.level) : course.level != null) return false;
        if (department != null ? !department.equals(course.department) : course.department != null) return false;
        return instructors != null ? instructors.equals(course.instructors) : course.instructors == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (crn != null ? crn.hashCode() : 0);
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (credits != null ? credits.hashCode() : 0);
        result = 31 * result + (level != null ? level.hashCode() : 0);
        result = 31 * result + (department != null ? department.hashCode() : 0);
        result = 31 * result + (instructors != null ? instructors.hashCode() : 0);
        return result;
    }
}
