package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepo extends CrudRepository<Item, Long> {

    List<Item> findAll();
    Item findById(String id);
    Item findBySpecialCode(String code);
    List<Item> findAllByRoom(Room room);
}
