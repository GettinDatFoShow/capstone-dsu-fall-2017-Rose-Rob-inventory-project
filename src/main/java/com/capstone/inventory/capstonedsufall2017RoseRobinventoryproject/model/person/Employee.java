package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

import javax.persistence.*;
import java.util.Date;

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
