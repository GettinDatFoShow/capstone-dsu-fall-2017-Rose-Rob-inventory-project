package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Item")
public class Item {

    @Id
    @Column(name="item_id")
    private Long id;

    @Column(name="type")
    private String type;

    @JoinColumn(name="room")
    @ManyToOne
    private Room room;

    @Column(name="added_to_room")
    private Date addedToRoom;

    @Column(name="created")
    private Date created;

    @Column(name="active")
    private Boolean active;

    @Column(name="item_cost")
    private Double cost;

    @Column(name="paid")
    private Boolean isPaid;

    @JoinColumn(name="item_details")
    @OneToMany
    private List<Detail> details;

    @JoinColumn(name="item_history")
    @OneToMany
    private List<ItemHistory> histories;

    public Item() {
    }

    public Item(Long id, String type, Room room, Date addedToRoom, Date created, Boolean active, List<Detail> details) {
        this.type = type;
        this.room = room;
        this.addedToRoom = addedToRoom;
        this.created = created;
        this.active = active;
        this.details = details;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Item item = (Item) o;

        if (id != null ? !id.equals(item.id) : item.id != null) return false;
        if (type != null ? !type.equals(item.type) : item.type != null) return false;
        if (room != null ? !room.equals(item.room) : item.room != null) return false;
        if (addedToRoom != null ? !addedToRoom.equals(item.addedToRoom) : item.addedToRoom != null) return false;
        if (created != null ? !created.equals(item.created) : item.created != null) return false;
        if (active != null ? !active.equals(item.active) : item.active != null) return false;
        if (cost != null ? !cost.equals(item.cost) : item.cost != null) return false;
        if (isPaid != null ? !isPaid.equals(item.isPaid) : item.isPaid != null) return false;
        if (details != null ? !details.equals(item.details) : item.details != null) return false;
        return histories != null ? histories.equals(item.histories) : item.histories == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (room != null ? room.hashCode() : 0);
        result = 31 * result + (addedToRoom != null ? addedToRoom.hashCode() : 0);
        result = 31 * result + (created != null ? created.hashCode() : 0);
        result = 31 * result + (active != null ? active.hashCode() : 0);
        result = 31 * result + (cost != null ? cost.hashCode() : 0);
        result = 31 * result + (isPaid != null ? isPaid.hashCode() : 0);
        result = 31 * result + (details != null ? details.hashCode() : 0);
        result = 31 * result + (histories != null ? histories.hashCode() : 0);
        return result;
    }
}
