package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.conditions;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.rest.exceptions.ResourceNotFoundException;

public class Preconditions {
    public static <T> T checkNotNull(T resource) {
        if (resource == null) {
            throw new ResourceNotFoundException();
        }
        return resource;
    }
}