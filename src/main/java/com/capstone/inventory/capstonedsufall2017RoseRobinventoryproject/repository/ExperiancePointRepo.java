package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.ExperiancePoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperiancePointRepo extends JpaRepository<ExperiancePoint, Long> {

    List<ExperiancePoint> findAllById(Long id);

}
