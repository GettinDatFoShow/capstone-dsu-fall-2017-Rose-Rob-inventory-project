package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Building;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Course;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.BuildingRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.CourseRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.ItemRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.RoomRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.Preconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.RestPreconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.OriginPath;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.RoomRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(RoomRequest.ROOMS)
@CrossOrigin(origins = {OriginPath.LOCAL})
public class RoomResource {

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private BuildingRepo buildingRepo;

    @RequestMapping(method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Room> findAll() {
        return this.roomRepo.findAll();
    }

    @RequestMapping(value = RoomRequest.FIND, method=RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Room findById(@RequestParam("id") String id) {
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        return room;
    }

    @RequestMapping(value=RoomRequest.CREATE, method=RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void create(@RequestBody Room room) {
        Preconditions.checkNotNull(room);
        this.roomRepo.save(room);
    }

    @RequestMapping(value=RoomRequest.UPDATE, method=RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestParam("id") String id, @RequestBody Room room) {
        Room oldRoom = this.roomRepo.findById(id);
        Preconditions.checkNotNull(oldRoom);
        RestPreconditions.checkFound(this.roomRepo.findById(room.getId()));
        this.roomRepo.save(room);
    }

    @RequestMapping(value=RoomRequest.FIND_ROOMS, method=RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Room> findRoomsByBuilding(@RequestParam("id") String id){
        Building building = this.buildingRepo.findById(id);
        RestPreconditions.checkFound(building);
        return building.getRooms();
    }

    @RequestMapping(value=RoomRequest.FIND_COURSES, method=RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Course> findCoursesByRoom(@RequestParam("id") String id){
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        return room.getCourses();
    }
}
