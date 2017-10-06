package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Building;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.BuildingRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.RoomRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.Preconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.RestPreconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.BuildingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(BuildingRequest.BUILDINGS)
@CrossOrigin(origins = {"http://localhost:8100"})
public class BuildingResource {

    @Autowired
    private BuildingRepo buildingRepo;

    @RequestMapping(method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Building> findAll() {
        return this.buildingRepo.findAll();
    }

    @RequestMapping(value = BuildingRequest.ID, method=RequestMethod.GET)
    @ResponseBody
    public Building findOne(@PathVariable("id") Long roomId) {
        return RestPreconditions.checkFound(this.buildingRepo.findOne(roomId));
    }

    @RequestMapping(value=BuildingRequest.ID, method=RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable( "id" ) Long id, @RequestBody Building room) {
        Preconditions.checkNotNull(room);
        RestPreconditions.checkFound(this.buildingRepo.findById(room.getId()));
        this.buildingRepo.save(room);
    }

}