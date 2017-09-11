package model;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class OrganizationTest {

    private Long aLong = 99L;
    private String aString = "string";
    private Address address = new Address();
    private List<Building> buildings = new ArrayList<>();
    private Organization organization = new Organization();
    private Organization testOrganization = new Organization(aString, address, aString, buildings);

    @Test
    public void testConstructor(){
        Organization testOrganization2 = new Organization(aString, address, aString, buildings);
        assertEquals(testOrganization, testOrganization2);
    }

    @Test
    public void getId() throws Exception {
        organization.setId(aLong);
        assertEquals(aLong, organization.getId());
    }

    @Test
    public void getName() throws Exception {
        organization.setName(aString);
        assertEquals(aString, organization.getName());
    }

    @Test
    public void getAddress() throws Exception {
        organization.setAddress(address);
        assertEquals(address, organization.getAddress());
    }

    @Test
    public void getType() throws Exception {
        organization.setType(aString);
        assertEquals(aString, organization.getType());
    }

    @Test
    public void getBuildings() throws Exception {
        organization.setBuildings(buildings);
        assertEquals(buildings, organization.getBuildings());
    }

}