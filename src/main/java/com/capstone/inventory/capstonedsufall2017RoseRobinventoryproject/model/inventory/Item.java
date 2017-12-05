package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.ItemLocation;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="item_id")
    private String id;

    @Column(name="special_code")
    private String specialCode;

    @Column(name="description")
    private String description;

    @Column(name="color")
    private String color;

    @Column(name="type")
    private String type;

    @JoinColumn(name="room")
    @ManyToOne
    private Room room;

    @Column(name="added_to_room")
    private String addedToRoom;

    @Column(name="created")
    private String created;

    @Column(name="last_updated")
    private String lastUpdated;

    @Column(name="lastAudit")
    private String lastAudit;

    @Column(name="active")
    private Boolean active;

    @Column(name="item_cost")
    private Double cost;

    @Column(name="paid")
    private Boolean isPaid;

    @Column(name="item_location")
    private String itemlocation;

    @JoinColumn(name="item_details")
    @OneToMany
    private List<Detail> details;

    @JoinColumn(name="item_history")
    @OneToMany
    private List<ItemHistory> histories;

    @JoinColumn(name="item_image")
    @OneToMany
    private List<ItemImage> images;

    public Item() {
    }

    public Item(String itemlocation, String specialCode, String type, Room room, String addedToRoom, String created, Boolean active, List<Detail> details) {
        this.specialCode = specialCode;
        this.type = type;
        this.room = room;
        this.addedToRoom = addedToRoom;
        this.created = created;
        this.active = active;
        this.details = details;
        this.itemlocation = itemlocation;
    }

    public Item(String specialCode, String type, Room room, String addedToRoom, String created, String lastUpdated, Boolean active, Double cost, Boolean isPaid) {
        this.specialCode = specialCode;
        this.type = type;
        this.room = room;
        this.addedToRoom = addedToRoom;
        this.created = created;
        this.lastUpdated = lastUpdated;
        this.active = active;
        this.cost = cost;
        this.isPaid = isPaid;
    }

    public Item(String specialCode, String type, Room room, String addedToRoom, String created, String lastUpdated, String lastAudit, Boolean active, Double cost, Boolean isPaid) {
        this.specialCode = specialCode;
        this.type = type;
        this.room = room;
        this.addedToRoom = addedToRoom;
        this.created = created;
        this.lastUpdated = lastUpdated;
        this.lastAudit = lastAudit;
        this.active = active;
        this.cost = cost;
        this.isPaid = isPaid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public String getAddedToRoom() {
        return addedToRoom;
    }

    public void setAddedToRoom(String addedToRoom) {
        this.addedToRoom = addedToRoom;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<Detail> getDetails() {
        return details;
    }

    public void setDetails(List<Detail> details) {
        this.details = details;
    }

    public List<ItemHistory> getHistories() {
        return histories;
    }

    public void setHistories(List<ItemHistory> histories) {
        this.histories = histories;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Boolean getPaid() {
        return isPaid;
    }

    public void setPaid(Boolean paid) {
        isPaid = paid;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getSpecialCode() {
        return specialCode;
    }

    public void setSpecialCode(String specialCode) {
        this.specialCode = specialCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getItemlocation() {
        return itemlocation;
    }

    public void setItemlocation(String itemlocation) {
        this.itemlocation = itemlocation;
    }

    public List<ItemImage> getImages() {
        return images;
    }

    public void setImages(List<ItemImage> images) {
        this.images = images;
    }

    public String getLastAudit() {
        return lastAudit;
    }

    public void setLastAudit(String lastAudit) {
        this.lastAudit = lastAudit;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id='" + id + '\'' +
                ", specialCode='" + specialCode + '\'' +
                ", description='" + description + '\'' +
                ", color='" + color + '\'' +
                ", type='" + type + '\'' +
                ", room=" + room +
                ", addedToRoom='" + addedToRoom + '\'' +
                ", created='" + created + '\'' +
                ", lastUpdated='" + lastUpdated + '\'' +
                ", lastAudit='" + lastAudit + '\'' +
                ", active=" + active +
                ", cost=" + cost +
                ", isPaid=" + isPaid +
                ", itemlocation='" + itemlocation + '\'' +
                ", details=" + details +
                ", histories=" + histories +
                ", images=" + images +
                '}';
    }
}
