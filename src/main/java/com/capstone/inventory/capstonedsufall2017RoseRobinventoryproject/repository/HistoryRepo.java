package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepo extends JpaRepository<History, Long> {

    List<History> findAll();
    History findById(Long id);

}