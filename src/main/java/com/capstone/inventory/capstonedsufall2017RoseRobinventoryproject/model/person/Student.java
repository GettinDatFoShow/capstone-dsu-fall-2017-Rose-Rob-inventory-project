package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.ExperiancePoint;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="student")
public class Student extends Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;
    private String studentId;
    private Double gpa;
    private String level;
    private String year;
    private List<ExperiancePoint> experiancePoints;

    public Student() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public Double getGpa() {
        return gpa;
    }

    public void setGpa(Double gpa) {
        this.gpa = gpa;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public List<ExperiancePoint> getExperiancePoints() {
        return experiancePoints;
    }

    public void setExperiancePoints(List<ExperiancePoint> experiancePoints) {
        this.experiancePoints = experiancePoints;
    }

}
