package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.ItemRequest;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.ItemRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.Preconditions;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions.RestPreconditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ItemRequest.ITEMS)
@CrossOrigin(origins = {"http://localhost:8100"})
class ItemResource {

    @Autowired
    private ItemRepo itemRepo;

    @RequestMapping(method=RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Item> findAll() {
        List<Item> items = this.itemRepo.findAll();
        return items;
    }

    @RequestMapping(value = ItemRequest.ID, method=RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Item findOne(@PathVariable("id") Long id) {
        Item item = this.itemRepo.findById(id);
        RestPreconditions.checkFound(item);
        return item;
    }

    @RequestMapping(value = ItemRequest.CODE, method=RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Item findOne(@PathVariable("code") String code) {
        Item item = this.itemRepo.findBySpecialCode(code);
        RestPreconditions.checkFound(item);
        return item;
    }

    @RequestMapping(method=RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Long create(@RequestBody Item item) {
        Preconditions.checkNotNull(item);
        this.itemRepo.save(item);
        return item.getId();
    }

    @RequestMapping(value=ItemRequest.ID, method=RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable( "id" ) Long id, @RequestBody Item item) {
        Preconditions.checkNotNull(item);
        RestPreconditions.checkFound(this.itemRepo.findById(item.getId()));
        this.itemRepo.save(item);
    }

}
