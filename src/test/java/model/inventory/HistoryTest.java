package model.inventory;

import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.*;

public class HistoryTest {

    private Long aLong = 99L;
    private Item item =  new Item();
    private String aString = "string";
    private Date date  = new Date();
    private History history = new History();
    private History testHistory = new History(item, aString, date);

    @Test
    public void testConstructor() {
        History testHistory2 = new History(item, aString, date);
        assertEquals(testHistory, testHistory2);
    }

    @Test
    public void getId() throws Exception {
        history.setId(aLong);
        assertEquals(aLong, history.getId());
    }

    @Test
    public void getItem() throws Exception {
        history.setItem(item);
        assertEquals(item, history.getItem());
    }

    @Test
    public void getAction() throws Exception {
        history.setAction(aString);
        assertEquals(aString, history.getAction());
    }

    @Test
    public void getDate() throws Exception {
        history.setDate(date);
        assertEquals(date, history.getDate());
    }

}