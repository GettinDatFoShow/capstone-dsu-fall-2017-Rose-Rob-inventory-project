package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Building;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuildingRepo extends JpaRepository<Building, String> {

    List<Building> findAll();
    Building findById(String id);
}
