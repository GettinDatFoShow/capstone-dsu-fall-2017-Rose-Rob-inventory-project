package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import javax.persistence.*;

@Entity
@Table(name = "Room_Location")
public class RoomLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "location_id")
    private String id;

    @Column(name = "roomlocation")
    private String roomlocation;

    @JoinColumn(name = "room")
    @ManyToOne
    private Room room;

    public RoomLocation(){

    }

    public RoomLocation(Room room, String roomlocation){
        this.room = room;
        this.roomlocation = roomlocation;
    }

    public String getId() {
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public Room getRoom(){
        return room;
    }

    public void setRoom(Room room){
        this.room = room;
    }

    public String getRoomlocation(){
        return roomlocation;
    }

    public void setRoomlocation(String roomlocation){
        this.roomlocation = roomlocation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RoomLocation that = (RoomLocation) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (roomlocation != null ? !roomlocation.equals(that.roomlocation) : that.roomlocation != null) return false;
        return room != null ? room.equals(that.room) : that.room == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (room != null ? room.hashCode() : 0);
        result = 31 * result + (roomlocation != null ? roomlocation.hashCode() : 0);
        return result;
    }

}
