package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;

import javax.persistence.*;
import javax.swing.*;
import java.util.Date;

@Entity
@Table(name="Room_History")
public class RoomHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "history_id")
    private String id;

    @Column(name = "action")
    private String action;

    @Column(name = "date")
    private String date;

    @JoinColumn(name = "room")
    @ManyToOne
    private Room room;

    public RoomHistory() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RoomHistory that = (RoomHistory) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (action != null ? !action.equals(that.action) : that.action != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        return room != null ? room.equals(that.room) : that.room == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (action != null ? action.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (room != null ? room.hashCode() : 0);
        return result;
    }
}
