package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Address;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.ExperiencePoint;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="student")
public class Student extends Person {

    @Column(name="student_id",nullable=false)
    private String studentId;

    @Column(name="gpa", nullable=false)
    private Double gpa;

    @Column(name="level",nullable=false)
    private String level;

    @Column(name="year",nullable=false)
    private String year;

    @Temporal(value=TemporalType.TIMESTAMP)
    @Column(name="created_time")
    private Date creationTime;

    @Temporal(value=TemporalType.TIMESTAMP)
    @Column(name="updated_time")
    private Date updatedTime;

    @Column(name="experience_points")
    @OneToMany
    private List<ExperiencePoint> experiencePoints;


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

    public Date getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

    public List<ExperiencePoint> getExperiencePoints() {
        return experiencePoints;
    }

    public void setExperiencePoints(List<ExperiencePoint> experiencePoints) {
        this.experiencePoints = experiencePoints;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Student student = (Student) o;

        if (studentId != null ? !studentId.equals(student.studentId) : student.studentId != null) return false;
        if (gpa != null ? !gpa.equals(student.gpa) : student.gpa != null) return false;
        if (level != null ? !level.equals(student.level) : student.level != null) return false;
        if (year != null ? !year.equals(student.year) : student.year != null) return false;
        if (creationTime != null ? !creationTime.equals(student.creationTime) : student.creationTime != null)
            return false;
        if (updatedTime != null ? !updatedTime.equals(student.updatedTime) : student.updatedTime != null) return false;
        return experiencePoints != null ? experiencePoints.equals(student.experiencePoints) : student.experiencePoints == null;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (studentId != null ? studentId.hashCode() : 0);
        result = 31 * result + (gpa != null ? gpa.hashCode() : 0);
        result = 31 * result + (level != null ? level.hashCode() : 0);
        result = 31 * result + (year != null ? year.hashCode() : 0);
        result = 31 * result + (creationTime != null ? creationTime.hashCode() : 0);
        result = 31 * result + (updatedTime != null ? updatedTime.hashCode() : 0);
        result = 31 * result + (experiencePoints != null ? experiencePoints.hashCode() : 0);
        return result;
    }
}
