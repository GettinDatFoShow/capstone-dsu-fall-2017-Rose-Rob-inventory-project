package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.service;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import java.util.ArrayList;
import java.util.List;

public class DescriptionService {
    private List<Item> items;
    public DescriptionService(List<Item> items) {
        this.items = items;
    }
    public List<String> getDescriptions(){
        List<String> descriptions = new ArrayList<>();
        for(int i = 0; i < this.items.size(); i++ ){
            String description = this.items.get(i).getDescription();
            if(description != null){
                descriptions.add(description);
            }
        }
        return descriptions;
    }
}