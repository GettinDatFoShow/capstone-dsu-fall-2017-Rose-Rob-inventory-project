package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import javax.persistence.*;

@Entity
@Table(name = "Room_Location")
public class RoomLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "location_id")
    private String id;

    @Column(name="latitude")
    private String latitude;

    @Column(name="longitude")
    private String longitude;

    @JoinColumn(name = "room")
    @ManyToOne
    private Room room;

    public RoomLocation(){
    }

    public RoomLocation(Room room, String latitude, String longitude){
        this.room = room;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RoomLocation that = (RoomLocation) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (longitude != null ? !longitude.equals(that.longitude) : that.longitude != null) return false;
        if (latitude != null ? !latitude.equals(that.latitude) : that.latitude != null) return false;
        return room != null ? room.equals(that.room) : that.room == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (room != null ? room.hashCode() : 0);
        result = 31 * result + (latitude != null ? latitude.hashCode() : 0);
        result = 31 * result + (longitude != null ? longitude.hashCode() : 0);
        return result;
    }

}
