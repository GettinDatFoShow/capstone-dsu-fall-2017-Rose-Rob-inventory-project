package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Item_History")
public class ItemHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "history_id")
    private String id;

    @Column(name = "action")
    private String action;

    @Column(name = "date")
    private String date;

    @JoinColumn(name = "item")
    @ManyToOne
    private Item item;

    public ItemHistory() {
    }

    public ItemHistory(Item item, String action, String date) {
        this.item = item;
        this.action = action;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ItemHistory that = (ItemHistory) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (action != null ? !action.equals(that.action) : that.action != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        return item != null ? item.equals(that.item) : that.item == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (action != null ? action.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (item != null ? item.hashCode() : 0);
        return result;
    }
}
