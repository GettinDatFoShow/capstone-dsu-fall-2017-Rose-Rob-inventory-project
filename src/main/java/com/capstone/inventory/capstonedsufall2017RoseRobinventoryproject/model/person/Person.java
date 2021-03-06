package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Address;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc.Detail;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="person")
@Inheritance(strategy = InheritanceType.JOINED)
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="person_id")
    private String id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="middle_name")
    private String middleName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="name_title")
    private String title;

    @Column(name="dob")
    private Date dob;

    @JoinColumn(name="address")
    @OneToMany
    private List<Address> addresses;

    @Column(name="details")
    @OneToMany
    private List<Detail> details;

    @Lob
    @Column(name="PROFILE_PIC")
    private byte[] profilePic;

    @Column(name="device_id")
    private String deviceId;

    public Person() {
    }

    public Person(String firstName, String middleName, String lastName, String title, Date dob, List<Address> addresses, List<Detail> details, byte[] profilePic, String deviceId) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.title = title;
        this.dob = dob;
        this.addresses = addresses;
        this.details = details;
        this.profilePic = profilePic;
        this.deviceId = deviceId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public List<Detail> getDetails() {
        return details;
    }

    public void setDetails(List<Detail> details) {
        this.details = details;
    }

    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Person person = (Person) o;

        if (id != null ? !id.equals(person.id) : person.id != null) return false;
        if (firstName != null ? !firstName.equals(person.firstName) : person.firstName != null) return false;
        if (middleName != null ? !middleName.equals(person.middleName) : person.middleName != null) return false;
        if (lastName != null ? !lastName.equals(person.lastName) : person.lastName != null) return false;
        if (title != null ? !title.equals(person.title) : person.title != null) return false;
        if (dob != null ? !dob.equals(person.dob) : person.dob != null) return false;
        if (addresses != null ? !addresses.equals(person.addresses) : person.addresses != null) return false;
        if (details != null ? !details.equals(person.details) : person.details != null) return false;
        if (!Arrays.equals(profilePic, person.profilePic)) return false;
        return deviceId != null ? deviceId.equals(person.deviceId) : person.deviceId == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (firstName != null ? firstName.hashCode() : 0);
        result = 31 * result + (middleName != null ? middleName.hashCode() : 0);
        result = 31 * result + (lastName != null ? lastName.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (dob != null ? dob.hashCode() : 0);
        result = 31 * result + (addresses != null ? addresses.hashCode() : 0);
        result = 31 * result + (details != null ? details.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(profilePic);
        result = 31 * result + (deviceId != null ? deviceId.hashCode() : 0);
        return result;
    }
}
