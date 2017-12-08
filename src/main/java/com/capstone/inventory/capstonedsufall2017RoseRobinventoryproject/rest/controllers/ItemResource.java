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
import org.springframework.web.util.UriComponents;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
        logger.info("finding item: {}", item);
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
    public void create(@RequestBody ItemWrapper itemWrapper, UriComponentsBuilder ucBuilder) {
//        Preconditions.checkNotNull(item);
        logger.info("Creating Item : {}", itemWrapper.getItem());
        Item item = itemWrapper.getItem();
        itemRepo.save(item);
        if(item.getSpecialCode() == null) {
            UriComponents uriComponents = UriComponentsBuilder.newInstance().path("/items/"+item.getId()).build();
            logger.info("setting special code : {}", uriComponents.toUriString());
            item.setSpecialCode(uriComponents.toUriString());
        }
        if(itemWrapper.getRoom() != null) {
            logger.info("Adding To Room : {}", itemWrapper.getRoom());
            item.setRoom(itemWrapper.getRoom());
        }
        if(itemWrapper.getImages().size() < 1) {
            logger.info("Creating ItemImages : {}", itemWrapper.getImages());
            this.imageRepo.save(itemWrapper.getImages());
            item.setImages(itemWrapper.getImages());
        }
        if(itemWrapper.getHistories().size() < 1) {
            logger.info("Creating ItemHistory : {}", itemWrapper.getHistories());
            this.historyRepo.save(itemWrapper.getHistories());
            item.setHistories(itemWrapper.getHistories());
        }
        if(itemWrapper.getDetails().size() < 1){
            logger.info("Creating ItemDetails : {}", itemWrapper.getDetails());
            this.detailRepo.save(itemWrapper.getDetails());
            item.setDetails(itemWrapper.getDetails());
        }
        this.itemRepo.save(item);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/items/code/{code}").buildAndExpand(item.getSpecialCode()).toUri());
        //return new ResponseEntity<String>(headers, HttpStatus.CREATED);
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
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody ItemWrapper itemWrapper, UriComponentsBuilder ucBuilder) {
//        Preconditions.checkNotNull(item);
        logger.info("HIT ITEM UPDATE URL..UPDATING ITEM...");
        logger.info("updating Item : {}", itemWrapper.getItem());
        logger.info("audit date: {}");
        Item item = itemWrapper.getItem();
        logger.info("room : {}", itemWrapper.getRoom());
        if(itemWrapper.getRoom() != null) {
            logger.info("updating room", itemWrapper.getRoom());
            item.setRoom(itemWrapper.getRoom());
        }
        if(itemWrapper.getImages() != null) {
            if(itemWrapper.getImages().size() > 0) {
                logger.info("updating ItemImages : {}", itemWrapper.getImages());
                this.imageRepo.save(itemWrapper.getImages());
                item.setImages(itemWrapper.getImages());
            }
        }
        logger.info("histories: {}", itemWrapper.getHistories());
        if(itemWrapper.getHistories() != null ) {
            if(itemWrapper.getHistories().size() > 0) {
                logger.info("updating ItemHistory : {}", itemWrapper.getHistories());
                this.historyRepo.save(itemWrapper.getHistories());
                item.setHistories(itemWrapper.getHistories());
            }
        }
        if(itemWrapper.getDetails() != null) {
            if (itemWrapper.getDetails().size() > 0) {
                logger.info("updating ItemDetails : {}", itemWrapper.getDetails());
                this.detailRepo.save(itemWrapper.getDetails());
                item.setDetails(itemWrapper.getDetails());
            }
        }
        this.itemRepo.save(item);
//        HttpHeaders headers = new HttpHeaders();
        UriComponents uriComponents = UriComponentsBuilder.newInstance().path("/items/"+item.getId()).build();
        logger.info("uri log: {}", uriComponents.toUriString());
    }

    @RequestMapping(value = ItemRequest.FIND_ITEMS, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<Item> findItemsByRoom(@RequestParam("id") String id) {
        Room room = this.roomRepo.findById(id);
        RestPreconditions.checkFound(room);
        return this.itemRepo.findAllByRoom(room);
    }

    @RequestMapping(value = ItemRequest.FIND_ITEM_HISTORIES, method= RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ItemHistory> findHistoryByItem(@RequestParam("id") String id) {
        Item item = this.itemRepo.findById(id);
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
        logger.info("finding item with id {}", id);
        logger.info("found {}", item);
        logger.info("found room: {}", item.getRoom());
//        RestPreconditions.checkFound(item);
        return item.getRoom();
    }

    @RequestMapping(value = ItemRequest.DESCRIPTIONS, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<String> getDescriptions() {
        List<Item> items = this.itemRepo.findAll();
        return new DescriptionService(items).getDescriptions();
    }

    @RequestMapping(value = ItemRequest.FIND_HISTORY, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<ItemHistory> getItemHistories() {
        return this.historyRepo.findAll();
    }

    
}
