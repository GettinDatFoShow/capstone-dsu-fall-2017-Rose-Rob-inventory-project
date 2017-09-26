package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Address;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="Employee")
public class Employee extends Person {

    @Column(name="date_of_hire",nullable=false)
    private Date dateOfHire;

    @Column(name="end_employment")
    private Date endEmployment;

    @Column(name="active_flag",nullable=false)
    private Boolean active;

    public Employee() {
    }

    public Employee(String firstName, String middleName, String lastName, String title, Date dob, List<Address> addresses, List<Detail> details, byte[] profilePic, String deviceId, Date dateOfHire, Date endEmployment, Boolean active) {
        super(firstName, middleName, lastName, title, dob, addresses, details, profilePic, deviceId);
        this.dateOfHire = dateOfHire;
        this.endEmployment = endEmployment;
        this.active = active;
    }

    public Date getDateOfHire() {
        return dateOfHire;
    }

    public void setDateOfHire(Date dateOfHire) {
        this.dateOfHire = dateOfHire;
    }

    public Date getEndEmployment() {
        return endEmployment;
    }

    public void setEndEmployment(Date endEmployment) {
        this.endEmployment = endEmployment;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
