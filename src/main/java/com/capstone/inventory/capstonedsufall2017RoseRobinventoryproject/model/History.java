package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String action;
    private Date date;

    @JoinColumn
    @ManyToOne
    private Item item;

    public History() {
    }

    public History(Item item, String action, Date date) {
        this.item = item;
        this.action = action;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        History history = (History) o;

        if (id != null ? !id.equals(history.id) : history.id != null) return false;
        if (item != null ? !item.equals(history.item) : history.item != null) return false;
        if (action != null ? !action.equals(history.action) : history.action != null) return false;
        return date != null ? date.equals(history.date) : history.date == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (item != null ? item.hashCode() : 0);
        result = 31 * result + (action != null ? action.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        return result;
    }
}