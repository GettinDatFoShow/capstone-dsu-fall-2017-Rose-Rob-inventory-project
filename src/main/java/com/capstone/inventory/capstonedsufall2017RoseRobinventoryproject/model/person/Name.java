package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.person;

public class Name {

    private String first;
    private String middle;
    private String last;
    private String title;

    public Name() {
    }

    public Name(String first, String middle, String last) {
        this.first = first;
        this.middle = middle;
        this.last = last;
    }

    public Name(String first, String middle, String last, String title) {
        this.first = first;
        this.middle = middle;
        this.last = last;
        this.title = title;
    }

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getMiddle() {
        return middle;
    }

    public void setMiddle(String middle) {
        this.middle = middle;
    }

    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
