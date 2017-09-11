package model.misc;

import org.junit.Test;

import static org.junit.Assert.*;


public class DetailTest {

    private Long aLong = 99L;
    private String aString = "string";
    private Detail detail = new Detail();
    private Detail testDetail = new Detail(aString, aString);

    @Test
    public void testConstructor(){
        Detail testDetail2 = new Detail(aString, aString);
        assertEquals(testDetail, testDetail2);
    }

    @Test
    public void getId() throws Exception {
        detail.setId(aLong);
        assertEquals(aLong, detail.getId());
    }

    @Test
    public void getType() throws Exception {
        detail.setType(aString);
        assertEquals(aString, detail.getType());
    }

    @Test
    public void getInfo() throws Exception {
        detail.setInfo(aString);
        assertEquals(aString, detail.getInfo());
    }

}