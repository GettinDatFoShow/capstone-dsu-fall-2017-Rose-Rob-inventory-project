package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
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
public class RoomResource {

    @Autowired
    private RoomRepo roomRepo;

    @RequestMapping(method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Room> findAll() {
        return this.roomRepo.findAll();
    }

    @RequestMapping(value = RoomRequest.ID, method=RequestMethod.GET)
    @ResponseBody
    public Room findOne(@PathVariable("id") Long itemId) {
        return RestPreconditions.checkFound(this.roomRepo.findOne(itemId));
    }

    @RequestMapping(method=RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Long create(@RequestBody Room item) {
        Preconditions.checkNotNull(item);
        this.roomRepo.save(item);
        return item.getId();
    }

    @RequestMapping(value=RoomRequest.ID, method=RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable( "id" ) Long id, @RequestBody Room item) {
        Preconditions.checkNotNull(item);
        RestPreconditions.checkFound(this.roomRepo.findById(item.getId()));
        this.roomRepo.save(item);
    }

}
