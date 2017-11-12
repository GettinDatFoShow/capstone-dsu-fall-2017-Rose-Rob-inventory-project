package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;

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
    private Date addedToRoom;

    @Column(name="created")
    private Date created;

    @Column(name="last_updated")
    private Date lastUpdated;

    @Column(name="active")
    private Boolean active;

    @Column(name="item_cost")
    private Double cost;

    @Column(name="paid")
    private Boolean isPaid;

    @Column(name="location")
    private String location;

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

    public Item(String specialCode, String type, Room room, Date addedToRoom, Date created, Boolean active, List<Detail> details) {
        this.specialCode = specialCode;
        this.type = type;
        this.room = room;
        this.addedToRoom = addedToRoom;
        this.created = created;
        this.active = active;
        this.details = details;
    }

    public Item(String specialCode, String type, Room room, Date addedToRoom, Date created, Date lastUpdated, Boolean active, Double cost, Boolean isPaid) {
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

    public Date getAddedToRoom() {
        return addedToRoom;
    }

    public void setAddedToRoom(Date addedToRoom) {
        this.addedToRoom = addedToRoom;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
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

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<ItemImage> getImages() {
        return images;
    }

    public void setImages(List<ItemImage> images) {
        this.images = images;
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
                ", addedToRoom=" + addedToRoom +
                ", created=" + created +
                ", lastUpdated=" + lastUpdated +
                ", active=" + active +
                ", cost=" + cost +
                ", isPaid=" + isPaid +
                ", location='" + location + '\'' +
                ", details=" + details +
                ", histories=" + histories +
                ", images=" + images +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Item item = (Item) o;

        if (id != null ? !id.equals(item.id) : item.id != null) return false;
        if (specialCode != null ? !specialCode.equals(item.specialCode) : item.specialCode != null) return false;
        if (description != null ? !description.equals(item.description) : item.description != null) return false;
        if (color != null ? !color.equals(item.color) : item.color != null) return false;
        if (type != null ? !type.equals(item.type) : item.type != null) return false;
        if (room != null ? !room.equals(item.room) : item.room != null) return false;
        if (addedToRoom != null ? !addedToRoom.equals(item.addedToRoom) : item.addedToRoom != null) return false;
        if (created != null ? !created.equals(item.created) : item.created != null) return false;
        if (lastUpdated != null ? !lastUpdated.equals(item.lastUpdated) : item.lastUpdated != null) return false;
        if (active != null ? !active.equals(item.active) : item.active != null) return false;
        if (cost != null ? !cost.equals(item.cost) : item.cost != null) return false;
        if (isPaid != null ? !isPaid.equals(item.isPaid) : item.isPaid != null) return false;
        if (location != null ? !location.equals(item.location) : item.location != null) return false;
        if (details != null ? !details.equals(item.details) : item.details != null) return false;
        if (histories != null ? !histories.equals(item.histories) : item.histories != null) return false;
        return images != null ? images.equals(item.images) : item.images == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (specialCode != null ? specialCode.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (color != null ? color.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (room != null ? room.hashCode() : 0);
        result = 31 * result + (addedToRoom != null ? addedToRoom.hashCode() : 0);
        result = 31 * result + (created != null ? created.hashCode() : 0);
        result = 31 * result + (lastUpdated != null ? lastUpdated.hashCode() : 0);
        result = 31 * result + (active != null ? active.hashCode() : 0);
        result = 31 * result + (cost != null ? cost.hashCode() : 0);
        result = 31 * result + (isPaid != null ? isPaid.hashCode() : 0);
        result = 31 * result + (location != null ? location.hashCode() : 0);
        result = 31 * result + (details != null ? details.hashCode() : 0);
        result = 31 * result + (histories != null ? histories.hashCode() : 0);
        result = 31 * result + (images != null ? images.hashCode() : 0);
        return result;
    }
}
