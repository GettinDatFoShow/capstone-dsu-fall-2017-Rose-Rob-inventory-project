package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepo extends CrudRepository<Course, Long> {

    List<Course> findAll();
    Course findById(Long id);

}