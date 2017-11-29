package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.RoomHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomHistoryRepo extends JpaRepository<RoomHistory, String> {

    List<RoomHistory> findAll();
    RoomHistory findById(String id);
    List<RoomHistory> findAllByRoom(Room room);

}
