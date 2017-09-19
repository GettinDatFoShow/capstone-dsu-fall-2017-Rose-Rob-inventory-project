package model.inventory;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.History;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Room;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Detail;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;

public class ItemTest {

    private Long aLong = 99L;
    private String aString = "string";
    private Room room = new Room();
    private Date date = new Date();
    private Boolean flag = true;
    private List<Detail> details = new ArrayList<>();
    private List<History> histories = new ArrayList<>();
    private Item item = new Item();
    private Item testItem = new Item(aLong, aString, room, date, date, flag, details);

    @Test
    public void testConstructor(){
        Item testItem2 = new Item(aLong, aString, room, date, date, flag, details);
        assertEquals(testItem, testItem2);
    }

    @Test
    public void getId() throws Exception {
        item.setId(aLong);
        assertEquals(aLong, item.getId());
    }

    @Test
    public void getType() throws Exception {
        item.setType(aString);
        assertEquals(aString, item.getType());
    }

    @Test
    public void getRoom() throws Exception {
        item.setRoom(room);
        assertEquals(room, item.getRoom());
    }

    @Test
    public void getAddedToRoom() throws Exception {
        item.setAddedToRoom(date);
        assertEquals(date, item.getAddedToRoom());
    }

    @Test
    public void getCreated() throws Exception {
        item.setCreated(date);
        assertEquals(date, item.getCreated());
    }

    @Test
    public void getActive() throws Exception {
        item.setActive(flag);
        assertEquals(flag, item.getActive());
    }

    @Test
    public void getDetails() throws Exception {
        item.setDetails(details);
        assertEquals(details, item.getDetails());
    }

    @Test public void getHistories() throws Exception {
        item.setHistories(histories);
        assertEquals(histories, item.getHistories());
    }
}