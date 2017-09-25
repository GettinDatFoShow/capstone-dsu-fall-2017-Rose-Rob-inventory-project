package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.ExperiencePoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperiencePointRepo extends JpaRepository<ExperiencePoint, Long> {

    List<ExperiencePoint> findAllById(Long id);

}
