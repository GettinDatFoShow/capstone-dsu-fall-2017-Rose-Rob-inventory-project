package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.Wrappers.ItemWrapper;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.ItemHistory;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.ItemImage;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.*;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.Preconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.RestPreconditions;
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
@RequestMapping(ItemRequest.ITEMS)
@CrossOrigin(origins = {OriginPath.LOCAL, OriginPath.EXTERNAL})
class ItemResource {

    public static final Logger logger = LoggerFactory.getLogger(com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.CapstoneDsuFall2017RoseRobInventoryProjectApplication.class);

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ItemImageRepo imageRepo;

    @Autowired
    private ItemHistoryRepo historyRepo;

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private DetailRepo detailRepo;

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

    @RequestMapping(value = ItemRequest.CREATE, method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestBody ItemWrapper itemWrapper, UriComponentsBuilder ucBuilder) {
//        Preconditions.checkNotNull(item);
        logger.info("Creating Item : {}", itemWrapper.getItem());
        logger.info("Creating ItemHistory : {}", itemWrapper.getHistories());
        logger.info("Adding To Room : {}", itemWrapper.getRoom());
        logger.info("Creating ItemImages : {}", itemWrapper.getImages());
        logger.info("Creating ItemDetails : {}", itemWrapper.getDetails());
        Item item = itemWrapper.getItem();
        item.setRoom(itemWrapper.getRoom());
        this.imageRepo.save(itemWrapper.getImages());
        this.historyRepo.save(itemWrapper.getHistories());
        this.detailRepo.save(itemWrapper.getDetails());
        item.setHistories(itemWrapper.getHistories());
        item.setDetails(itemWrapper.getDetails());
        item.setImages(itemWrapper.getImages());
        this.itemRepo.save(item);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/items/code/{code}").buildAndExpand(item.getSpecialCode()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = ItemRequest.FIND_ITEM_IMAGES, method = RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ItemImage> getItemImages(@PathVariable("id") String id){
        Item item = this.itemRepo.findById(id);
        Preconditions.checkNotNull(item);
        return item.getImages();
    }

    @RequestMapping(value = ItemRequest.UPDATE_ITEM, method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> update(@RequestBody ItemWrapper itemWrapper, UriComponentsBuilder ucBuilder) {
//        Preconditions.checkNotNull(item);
        logger.info("updating Item : {}", itemWrapper.getItem());
        logger.info("updating ItemHistory : {}", itemWrapper.getHistories());
        logger.info("updating ItemRoom : {}", itemWrapper.getRoom());
        logger.info("updating ItemDetails : {}", itemWrapper.getDetails());
        logger.info("updating ItemImages : {}", itemWrapper.getImages());
        Item item = itemWrapper.getItem();
        item.setRoom(itemWrapper.getRoom());
        this.imageRepo.save(itemWrapper.getImages());
        this.historyRepo.save(itemWrapper.getHistories());
        this.detailRepo.save(itemWrapper.getDetails());
        item.setHistories(itemWrapper.getHistories());
        item.setDetails(itemWrapper.getDetails());
        item.setImages(itemWrapper.getImages());
        this.itemRepo.save(item);
        HttpHeaders headers = new HttpHeaders();
        RestPreconditions.checkFound(this.itemRepo.findById(item.getId()));
        this.itemRepo.save(item);
        headers.setLocation(ucBuilder.path("/items/code/{code}").buildAndExpand(item.getSpecialCode()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
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
    public List<ItemHistory> findHistoryByItem(@RequestParam("id") String id) {
        Item item = this.itemRepo.findById(id);
        RestPreconditions.checkFound(item);
        return item.getHistories();
    }

    @RequestMapping(value = ItemRequest.FIND_DETAILS, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Detail> findDetailsByItem(@RequestParam("id") String id) {
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

    @RequestMapping(value = ItemRequest.DESCRIPTIONS, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<String> getDescriptions() {
        List<Item> items = this.itemRepo.findAll();
        return new DescriptionService(items).getDescriptions();
    }

    @RequestMapping(value = ItemRequest.FIND_ITEM_HISTORIES, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<ItemHistory> getItemHistories(@RequestParam("id") String id) {
        Item item = this.itemRepo.findById(id);
        return this.historyRepo.findAllByItem(item);
    }

    
}
