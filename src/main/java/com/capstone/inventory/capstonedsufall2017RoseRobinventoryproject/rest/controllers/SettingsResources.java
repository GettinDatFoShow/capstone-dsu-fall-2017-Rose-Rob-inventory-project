package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.controllers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Settings;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.SettingsRepo;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.OriginPath;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.constants.SettingsRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(SettingsRequest.SETTINGS)
@CrossOrigin(origins = {OriginPath.LOCAL, OriginPath.EXTERNAL, OriginPath.E2})
public class SettingsResources {

    public static final Logger logger = LoggerFactory.getLogger(com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.CapstoneDsuFall2017RoseRobInventoryProjectApplication.class);

    @Autowired
    private SettingsRepo settingsRepo;

    @RequestMapping(method= RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Settings> findAll() {
        List<Settings> settings = this.settingsRepo.findAll();
        return settings;
    }

    @RequestMapping(value= SettingsRequest.UPDATE, method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void update(@RequestBody Settings settings ) {
        logger.info("updating settings", settings);
        this.settingsRepo.save(settings);
    }

}
