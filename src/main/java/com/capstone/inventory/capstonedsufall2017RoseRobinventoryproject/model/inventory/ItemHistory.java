package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Item_History")
public class ItemHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="history_id")
    private Long id;

    @Column(name="action")
    private String action;

    @Column(name="date")
    private Date date;

    @JoinColumn(name="item")
    @ManyToOne
    private Item item;

    public ItemHistory() {
    }

    public ItemHistory(Item item, String action, Date date) {
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

        ItemHistory itemHistory = (ItemHistory) o;

        if (id != null ? !id.equals(itemHistory.id) : itemHistory.id != null) return false;
        if (item != null ? !item.equals(itemHistory.item) : itemHistory.item != null) return false;
        if (action != null ? !action.equals(itemHistory.action) : itemHistory.action != null) return false;
        return date != null ? date.equals(itemHistory.date) : itemHistory.date == null;
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