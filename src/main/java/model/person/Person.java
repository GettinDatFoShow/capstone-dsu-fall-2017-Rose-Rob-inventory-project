package model.person;

import model.misc.Address;
import model.misc.Detail;

import java.util.Date;
import java.util.List;

public class Person {

    private Name name;
    private Date born;
    private Address homeAddress;
    private List<Detail> details;

    public Person() {
    }

    public Person(Name name, Date born, Address homeAddress, List<Detail> details) {
        this.name = name;
        this.born = born;
        this.homeAddress = homeAddress;
        this.details = details;
    }

    public Name getName() {
        return name;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public Date getBorn() {
        return born;
    }

    public void setBorn(Date born) {
        this.born = born;
    }

    public Address getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(Address homeAddress) {
        this.homeAddress = homeAddress;
    }

    public List<Detail> getDetails() {
        return details;
    }

    public void setDetails(List<Detail> details) {
        this.details = details;
    }
}
