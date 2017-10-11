package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Building;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.BuildingRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.RoomRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.Preconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.RestPreconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.BuildingRequest;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.OriginPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(BuildingRequest.BUILDINGS)
@CrossOrigin(origins = {OriginPath.LOCAL, OriginPath.EXTERNAL})
public class BuildingResource {

    @Autowired
    private BuildingRepo buildingRepo;

    @Autowired
    private RoomRepo roomRepo;

    @RequestMapping(method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Building> findAll() {
        return this.buildingRepo.findAll();
    }

    @RequestMapping(value = BuildingRequest.ID, method=RequestMethod.GET)
    @ResponseBody
    public Building findById(@PathVariable("id") String buildingId) {
        return RestPreconditions.checkFound(this.buildingRepo.findById(buildingId));
    }

    @RequestMapping(value=BuildingRequest.ID, method=RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable( "id" ) String id, @RequestBody Building building) {
        Preconditions.checkNotNull(building);
        RestPreconditions.checkFound(this.buildingRepo.findById(id));
        this.buildingRepo.save(building);
    }

    @RequestMapping(value=BuildingRequest.CREATE, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void create(@RequestBody Building building) {
        Preconditions.checkNotNull(building);
        this.buildingRepo.save(building);
    }

    @RequestMapping(value = BuildingRequest.ID, method=RequestMethod.GET)
    @ResponseBody
    public Building findByRoomId(@RequestParam("id") String roomId) {
        Room room = this.roomRepo.findById(roomId);
        return RestPreconditions.checkFound(room.getBuilding());
    }

}