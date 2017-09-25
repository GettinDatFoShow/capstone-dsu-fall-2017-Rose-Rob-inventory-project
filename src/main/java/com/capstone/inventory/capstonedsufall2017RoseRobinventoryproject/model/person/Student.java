package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.ExperiencePoint;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="student")
public class Student extends Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="student_id")
    private String studentId;

    @Column(name="gpa")
    private Double gpa;

    @Column(name="level")
    private String level;

    @Column(name="year")
    private String year;

    @Column(name="experience_points")
    @OneToMany
    private List<ExperiencePoint> experiencePoints;

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

    public List<ExperiencePoint> getExperiancePoints() {
        return experiencePoints;
    }

    public void setExperiancePoints(List<ExperiencePoint> experiencePoints) {
        this.experiencePoints = experiencePoints;
    }

}
