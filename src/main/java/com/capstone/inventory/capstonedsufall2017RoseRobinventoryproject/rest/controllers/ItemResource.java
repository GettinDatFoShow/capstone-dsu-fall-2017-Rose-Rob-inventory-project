package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.ItemHistory;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.ItemRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.RoomRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.Preconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.RestPreconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.ItemRequest;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.OriginPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ItemRequest.ITEMS)
@CrossOrigin(origins = {OriginPath.LOCAL, OriginPath.EXTERNAL})
class ItemResource {

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private RoomRepo roomRepo;

    @RequestMapping(method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Item> findAll() {
        List<Item> items = this.itemRepo.findAll();
        return items;
    }

    @RequestMapping(value = ItemRequest.ID, method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Item findById(@PathVariable("id") String id) {
        Item item = this.itemRepo.findById(id);
        RestPreconditions.checkFound(item);
        return item;
    }

    @RequestMapping(value = ItemRequest.CODE, method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Item findByCode(@PathVariable("code") String code) {
        Item item = this.itemRepo.findBySpecialCode(code);
        RestPreconditions.checkFound(item);
        return item;
    }

    @RequestMapping(method= RequestMethod.POST, produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Item create(@RequestBody Item item) {
        Preconditions.checkNotNull(item);
        this.itemRepo.save(item);
        return item;
    }

    @RequestMapping(value = ItemRequest.CODE, method= RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable( "code" ) String code, @RequestBody Item item) {
        Item oldItem = this.itemRepo.findBySpecialCode(code);
        Preconditions.checkNotNull(oldItem);
        Preconditions.checkNotNull(item);
        RestPreconditions.checkFound(this.itemRepo.findById(item.getId()));
        this.itemRepo.save(item);
    }

    @RequestMapping(value = ItemRequest.FIND_ITEMS, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Item> findItemsByRoom(@RequestParam("id") String id) {
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        return this.itemRepo.findAllByRoom(room);
    }

    @RequestMapping(value = ItemRequest.FIND_HISTORY, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ItemHistory> findHistoryByRoom(@RequestParam("id") String id) {
        Item item = this.itemRepo.findById(id);
        RestPreconditions.checkFound(item);
        return item.getHistories();
    }

    @RequestMapping(value = ItemRequest.FIND_DETAILS, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Detail> findDetailsByRoom(@RequestParam("id") String id) {
        Item item = this.itemRepo.findById(id);
        RestPreconditions.checkFound(item);
        return item.getDetails();
    }

    @RequestMapping(value = ItemRequest.ITEM_TO_ROOM, method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Room findRoomByItemId(@RequestParam("id") String id) {
        Item item = this.itemRepo.findById(id);
        RestPreconditions.checkFound(item);
        return item.getRoom();
    }

}
