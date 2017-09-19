package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.exceptions.ResourceNotFoundException;

public class RestPreconditions {
    public static <T> T checkFound(T resource) {
        if (resource == null) {
            throw new ResourceNotFoundException();
        }
        return resource;
    }
}