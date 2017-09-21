package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Course;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person.Employee;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="instructor")
public class Instructor extends Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @JoinColumn
    @ManyToMany
    private List<Course> courses;

    public Instructor() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}
