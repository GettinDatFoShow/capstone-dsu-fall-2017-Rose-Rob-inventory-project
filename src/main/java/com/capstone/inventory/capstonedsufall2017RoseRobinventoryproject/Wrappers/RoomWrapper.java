package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.Wrappers;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Building;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.RoomLocation;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.RoomHistory;
import java.util.List;

public class RoomWrapper {

    public Room room;
    public Building building;
    public List<RoomHistory> histories;
    public RoomLocation longitude;
    public RoomLocation latitude;


    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public List<RoomHistory> getHistories() {
        return histories;
    }

    public void setHistories(List<RoomHistory> histories) {
        this.histories = histories;
    }

    public RoomLocation getLongitude() {
        return longitude;
    }

    public void setLongitude(RoomLocation longitude) {
        this.longitude = longitude;
    }

    public RoomLocation getLatitude() {
        return latitude;
    }

    public void setLatitude(RoomLocation latitude) {
        this.latitude = latitude;
    }

    @Override
    public String toString() {
        return "RoomWrapper{" +
                "room=" + room +
                ", building=" + building +
                ", histories=" + histories +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                '}';
    }
}