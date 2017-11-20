package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.Wrappers;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Building;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.RoomLocation;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.RoomHistory;
import java.util.List;

public class RoomWrapper {

    Room room;
    Building building;
    List<RoomHistory> histories;
    List<Detail> details;
    List<RoomLocation> roomLocations;

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room item) {
        this.room = room;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public List<RoomLocation> getRoomLocations() {
        return roomLocations;
    }

    public void setRoomLocations(List<RoomLocation> roomLocations){
        this.roomLocations = roomLocations;
    }

    public List<RoomHistory> getHistories() {
        return histories;
    }

    public void setHistories(List<RoomHistory> histories) {
        this.histories = histories;
    }

    public List<Detail> getDetails() {
        return details;
    }

    public void setDetails(List<Detail> details) {
        this.details = details;
    }

    @Override
    public String toString() {
        return "RoomWrapper{" +
                "room=" + room +
                ", building=" + building +
                ", histories=" + histories +
                ", details=" + details +
                ", roomlocations=" + roomLocations +
                '}';
    }
}