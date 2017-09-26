package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Course;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person.Employee;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="instructor")
public class Instructor extends Employee {

    @Column(name="instructor_id",nullable=false)
    private Long instructor_id;

    @JoinColumn(name="courses")
    @ManyToMany
    private List<Course> courses;

    public Instructor() {
    }

    public Long getInstructor_id() {
        return instructor_id;
    }

    public void setInstructor_id(Long instructor_id) {
        this.instructor_id = instructor_id;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Instructor that = (Instructor) o;

        if (instructor_id != null ? !instructor_id.equals(that.instructor_id) : that.instructor_id != null)
            return false;
        return courses != null ? courses.equals(that.courses) : that.courses == null;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (instructor_id != null ? instructor_id.hashCode() : 0);
        result = 31 * result + (courses != null ? courses.hashCode() : 0);
        return result;
    }
}
