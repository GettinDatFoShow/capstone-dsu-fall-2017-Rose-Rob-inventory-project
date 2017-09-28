package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;

import javax.persistence.*;

@Entity
@Table(name="Detail")
public class Detail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="detail_id")
    private Long id;

    @Column(name="type")
    private String type;

    @Column(name="info")
    private String info;

    @JoinColumn(name="item")
    @ManyToOne
    private Item item;

    public Detail() {
    }

    public Detail(String type, String info) {
        this.type = type;
        this.info = info;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Detail detail = (Detail) o;

        if (id != null ? !id.equals(detail.id) : detail.id != null) return false;
        if (type != null ? !type.equals(detail.type) : detail.type != null) return false;
        if (info != null ? !info.equals(detail.info) : detail.info != null) return false;
        return item != null ? item.equals(detail.item) : detail.item == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (info != null ? info.hashCode() : 0);
        result = 31 * result + (item != null ? item.hashCode() : 0);
        return result;
    }
}
