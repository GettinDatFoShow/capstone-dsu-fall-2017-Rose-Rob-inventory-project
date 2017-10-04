package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.ItemRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.RoomRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.Preconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.RestPreconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.RoomRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(RoomRequest.ROOMS)
@CrossOrigin(origins = {"http://localhost:8100"})
public class RoomResource {

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private ItemRepo itemRepo;

    @RequestMapping(method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Room> findAll() {
        return this.roomRepo.findAll();
    }

    @RequestMapping(value = RoomRequest.FIND, method=RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Room findById(@RequestParam("id") String id) {
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        return room;
    }

    @RequestMapping(value=RoomRequest.CREATE, method=RequestMethod.POST, produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String create(@RequestBody Room room) {
        Preconditions.checkNotNull(room);
        this.roomRepo.save(room);
        return room.getId();
    }

    @RequestMapping(value=RoomRequest.UPDATE, method=RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestParam("id") String id, @RequestBody Room room) {
        Room oldRoom = this.roomRepo.findById(id);
        Preconditions.checkNotNull(oldRoom);
        RestPreconditions.checkFound(this.roomRepo.findById(room.getId()));
        this.roomRepo.save(room);
    }

    @RequestMapping(value = RoomRequest.FIND_ITEMS, method=RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Item> findItemsByRoom(@RequestParam("id") String id) {
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        List<Item> items = this.itemRepo.findAllByRoom(room);
        return items;
    }

}
