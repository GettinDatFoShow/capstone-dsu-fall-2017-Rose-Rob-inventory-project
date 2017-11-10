package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.Wrappers;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.ItemHistory;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.ItemImage;

import java.util.List;

public class ItemWrapper {

    Item item;
    Room room;
    List<ItemHistory> histories;
    List<ItemImage> images;
    List<Detail> details;

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public List<ItemHistory> getHistories() {
        return histories;
    }

    public void setHistories(List<ItemHistory> histories) {
        this.histories = histories;
    }

    public List<ItemImage> getImages() {
        return images;
    }

    public void setImages(List<ItemImage> images) {
        this.images = images;
    }

    public List<Detail> getDetails() {
        return details;
    }

    public void setDetails(List<Detail> details) {
        this.details = details;
    }

    @Override
    public String toString() {
        return "ItemWrapper{" +
                "item=" + item +
                ", room=" + room +
                ", histories=" + histories +
                ", images=" + images +
                ", details=" + details +
                '}';
    }
}
