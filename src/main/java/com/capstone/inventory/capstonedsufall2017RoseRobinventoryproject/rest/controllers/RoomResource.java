package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.Wrappers.RoomWrapper;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Building;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Course;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.RoomHistory;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.*;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.*;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.Preconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.RestPreconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.OriginPath;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.RoomRequest;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.ItemRequest;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.OriginPath;
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
class RoomResource {

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

    @RequestMapping(value = RoomRequest.ID, method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Room findById(@RequestParam("id") String id) {
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        return room;
    }

    @RequestMapping(value = RoomRequest.FIND_CODE, method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Room findByCode(@RequestParam("id") String id) {
        logger.info("nfc received: ", id);
        Room room = this.roomRepo.findByNfcCode(id);
        logger.info("Room found by nfc: ", room);
        return room;
    }

    @RequestMapping(value = RoomRequest.CREATE, method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void create(@RequestBody RoomWrapper roomWrapper) {
        logger.info("creating Room : {}", roomWrapper.getRoom());
        logger.info("with RoomHistory : {}", roomWrapper.getHistories());
        logger.info("with RoomBuilding : {}", roomWrapper.getBuilding());
        Room room = roomWrapper.getRoom();
        room.setBuilding(roomWrapper.getBuilding());
        room.setHistories(roomWrapper.getHistories());
        this.roomHistoryRepo.save(roomWrapper.getHistories());
        this.roomRepo.save(room);

    }


    @RequestMapping(value = RoomRequest.UPDATE_ROOM, method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody RoomWrapper roomWrapper, UriComponentsBuilder ucBuilder) {
        logger.info("updating Room : {}", roomWrapper.getRoom());
        logger.info("updating RoomHistory : {}", roomWrapper.getHistories());
        logger.info("updating RoomBuilding : {}", roomWrapper.getBuilding());
        Room room = roomWrapper.getRoom();
        room.setBuilding(roomWrapper.getBuilding());
        this.roomHistoryRepo.save(roomWrapper.getHistories());
        room.setHistories(roomWrapper.getHistories());
        this.roomRepo.save(room);
    }

    @RequestMapping(value=RoomRequest.FIND_ROOMS, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Room> findRoomsByBuilding(@RequestParam("id") String id){
        Building building = this.buildingRepo.findById(id);
        RestPreconditions.checkFound(building);
        return building.getRooms();
    }

    @RequestMapping(value=RoomRequest.FIND_COURSES, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Course> findCoursesByRoom(@RequestParam("id") String id){
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        return room.getCourses();
    }

    @RequestMapping(value = RoomRequest.FIND_ROOM_HISTORIES, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<RoomHistory> getRoomHistories(@RequestParam("id") String id) {
        Room room = this.roomRepo.findById(id);
        return this.roomHistoryRepo.findAllByRoom(room);
    }

    @RequestMapping(value = RoomRequest.FIND_HISTORY, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<RoomHistory> findHistoryByRoom(@RequestParam("id") String id) {
        Room room = this.roomRepo.findById(id);
        return room.getHistories();
    }

}
