package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory;

import javax.persistence.*;

@Entity
@Table(name = "item_image")
public class ItemImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_id")
    private String id;

    @Lob
    @Column(name = "base64string")
    private String base64string;

    @JoinColumn(name = "item")
    @ManyToOne
    private Item item;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBase64string() {
        return base64string;
    }

    public void setBase64string(String base64string) {
        this.base64string = base64string;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
