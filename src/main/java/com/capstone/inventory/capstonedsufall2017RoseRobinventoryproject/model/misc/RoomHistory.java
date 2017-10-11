package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="room_history")
public class RoomHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String roomHistroyId;

    @JoinColumn(name="room")
    @ManyToOne
    private Room room;

    @Column(name="date")
    private Date date;

    @Column(name="action")
    private String action;

    public String getRoomHistroyId() {
        return roomHistroyId;
    }

    public void setRoomHistroyId(String roomHistroyId) {
        this.roomHistroyId = roomHistroyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RoomHistory that = (RoomHistory) o;

        if (roomHistroyId != null ? !roomHistroyId.equals(that.roomHistroyId) : that.roomHistroyId != null)
            return false;
        if (room != null ? !room.equals(that.room) : that.room != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        return action != null ? action.equals(that.action) : that.action == null;
    }

    @Override
    public int hashCode() {
        int result = roomHistroyId != null ? roomHistroyId.hashCode() : 0;
        result = 31 * result + (room != null ? room.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (action != null ? action.hashCode() : 0);
        return result;
    }
}
