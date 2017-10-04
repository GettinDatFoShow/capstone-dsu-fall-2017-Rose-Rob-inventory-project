package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

import javax.persistence.*;

    @Entity
    @Table(name="person_detail")
    public class PersonDetail {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name="detail_id")
        private String id;

        @Column(name="type")
        private String type;

        @Column(name="info")
        private String info;

        @JoinColumn(name="person")
        @ManyToOne
        private Person person;


        public PersonDetail() {
        }

        public PersonDetail(String type, String info) {
            this.type = type;
            this.info = info;
        }

        public PersonDetail(String type, String info, Person person) {
            this.type = type;
            this.info = info;
            this.person = person;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getInfo() {
            return info;
        }

        public void setInfo(String info) {
            this.info = info;
        }

        public Person getPerson() {
            return person;
        }

        public void setPerson(Person person) {
            this.person = person;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            PersonDetail that = (PersonDetail) o;

            if (id != null ? !id.equals(that.id) : that.id != null) return false;
            if (type != null ? !type.equals(that.type) : that.type != null) return false;
            if (info != null ? !info.equals(that.info) : that.info != null) return false;
            return person != null ? person.equals(that.person) : that.person == null;
        }

        @Override
        public int hashCode() {
            int result = id != null ? id.hashCode() : 0;
            result = 31 * result + (type != null ? type.hashCode() : 0);
            result = 31 * result + (info != null ? info.hashCode() : 0);
            result = 31 * result + (person != null ? person.hashCode() : 0);
            return result;
        }
    }

