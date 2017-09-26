package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person.Student;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="ExperiencePoint")
public class ExperiencePoint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="experiance_point_id")
    private Long id;

    @Column(name="score")
    private Long score;

    @Column(name="created")
    private Date created;

    @JoinColumn(name="student")
    @ManyToOne
    private Student student;

    public ExperiencePoint() {
    }

    public ExperiencePoint(Long score, Date created, Student student) {
        this.score = score;
        this.created = created;
        this.student = student;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
