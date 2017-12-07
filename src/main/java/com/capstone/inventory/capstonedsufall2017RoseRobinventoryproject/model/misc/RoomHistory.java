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
    public String toString() {
        return "RoomHistory{" +
                "id='" + id + '\'' +
                ", action='" + action + '\'' +
                ", date='" + date + '\'' +
                ", room=" + room +
                '}';
    }
}
