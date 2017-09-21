package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory;

import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.*;

public class ItemHistoryTest {

    private Long aLong = 99L;
    private Item item =  new Item();
    private String aString = "string";
    private Date date  = new Date();
    private ItemHistory itemHistory = new ItemHistory();
    private ItemHistory testItemHistory = new ItemHistory(item, aString, date);

    @Test
    public void testConstructor() {
        ItemHistory testItemHistory2 = new ItemHistory(item, aString, date);
        assertEquals(testItemHistory, testItemHistory2);
    }

    @Test
    public void getId() throws Exception {
        itemHistory.setId(aLong);
        assertEquals(aLong, itemHistory.getId());
    }

    @Test
    public void getItem() throws Exception {
        itemHistory.setItem(item);
        assertEquals(item, itemHistory.getItem());
    }

    @Test
    public void getAction() throws Exception {
        itemHistory.setAction(aString);
        assertEquals(aString, itemHistory.getAction());
    }

    @Test
    public void getDate() throws Exception {
        itemHistory.setDate(date);
        assertEquals(date, itemHistory.getDate());
    }

}