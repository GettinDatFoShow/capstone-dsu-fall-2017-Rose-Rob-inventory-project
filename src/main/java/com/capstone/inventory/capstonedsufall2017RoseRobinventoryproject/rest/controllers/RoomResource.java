package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.Wrappers.RoomWrapper;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Building;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Course;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.*;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.Preconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.RestPreconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.OriginPath;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.RoomRequest;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.ItemRequest;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.OriginPath;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.service.DescriptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping(RoomRequest.ROOMS)
@CrossOrigin(origins = {OriginPath.LOCAL, OriginPath.EXTERNAL})
public class RoomResource {

    public static final Logger logger = LoggerFactory.getLogger(com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.CapstoneDsuFall2017RoseRobInventoryProjectApplication.class);

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private RoomHistoryRepo roomHistoryRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private BuildingRepo buildingRepo;

    @RequestMapping(method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Room> findAll() {
        List<Room> rooms = this.roomRepo.findAll();
        return rooms;
    }

    @RequestMapping(value = RoomRequest.FIND, method= RequestMethod.GET, produces = "application/json")
    //@ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Room findById(@RequestParam("id") String id) {
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        return room;
    }

    @RequestMapping(value = RoomRequest.FIND_CODE, method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Room findByCode(@RequestParam("code") String code) {
        Room room = this.roomRepo.findByNfcCode(code);
        RestPreconditions.checkFound(room);
        return room;
    }

    @RequestMapping(value=RoomRequest.CREATE, method= RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@RequestBody RoomWrapper roomWrapper, UriComponentsBuilder ucBuilder) {
//        Preconditions.checkNotNull(item);
        logger.info("Creating Room : {}", roomWrapper);
        Room room = roomWrapper.getRoom();
        room.setBuilding(roomWrapper.getBuilding());
        room.setRoomHistory(roomWrapper.getHistories());
        this.roomHistoryRepo.save(room.getRoomHistory());
        this.roomRepo.save(room);
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value=RoomRequest.UPDATE, method= RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestParam("id") String id, @RequestBody RoomWrapper roomWrapper) {
        Room room = this.roomRepo.findById(id);
        List<Item>  items = room.getItems();
        Preconditions.checkNotNull(room);
        this.roomHistoryRepo.save(roomWrapper.getHistories());
        room = roomWrapper.getRoom();
        room.setBuilding(roomWrapper.getBuilding());
        room.setRoomHistory(roomWrapper.getHistories());
        room.setItems(items);
        this.roomRepo.save(room);
    }

    @RequestMapping(value=RoomRequest.FIND_ROOMS, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Room> findRoomsByBuilding(@RequestParam("id") String id){
        Building building = this.buildingRepo.findById(id);
        RestPreconditions.checkFound(building);
        return this.roomRepo.findAllByBuilding(building);
    }

    @RequestMapping(value=RoomRequest.FIND_COURSES, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Course> findCoursesByRoom(@RequestParam("id") String id){
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        return room.getCourses();
    }
}
