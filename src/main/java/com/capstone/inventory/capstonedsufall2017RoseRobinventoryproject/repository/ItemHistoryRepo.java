package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.ItemHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemHistoryRepo extends JpaRepository<ItemHistory, Long> {

    List<ItemHistory> findAll();
    ItemHistory findById(Long id);
    List<ItemHistory> findAllByItem(Item item);

}