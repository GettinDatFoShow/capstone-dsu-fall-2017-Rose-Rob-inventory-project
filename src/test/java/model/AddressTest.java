package model;

import org.junit.Test;

import static org.junit.Assert.*;

public class AddressTest {

    private Address address = new Address();
    private Integer number = 99;
    private String aString = "string";
    private Address testAddress = new Address(number, aString, aString, aString, number);

    @Test
    public void testConstructor() throws Exception {
        Address testAddress2 = new Address(number, aString, aString, aString, number);
        assertEquals(testAddress, testAddress2);
    }

    @Test
    public void getAddressNumber() throws Exception {
        address.setAddressNumber(number);
        assertEquals(number, address.getAddressNumber());
    }

    @Test
    public void getStreetName() throws Exception {
        address.setStreetName(aString);
        assertEquals(aString, address.getStreetName());
    }

    @Test
    public void getCity() throws Exception {
        address.setCity(aString);
        assertEquals(aString, address.getCity());
    }

    @Test
    public void getState() throws Exception {
        address.setState(aString);
        assertEquals(aString, address.getState());
    }

    @Test
    public void getZip() throws Exception {
        address.setZip(number);
        assertEquals(number, address.getZip());
    }

}