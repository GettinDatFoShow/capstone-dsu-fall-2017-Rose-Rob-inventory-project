package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory;

import javax.persistence.*;

@Entity
@Table(name = "Item_Location")
public class ItemLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "location_id")
    private String id;

    @Column(name = "itemlocation")
    private String itemlocation;

    @JoinColumn(name = "item")
    @ManyToOne
    private Item item;

    public ItemLocation(){

    }

    public ItemLocation(Item item, String itemlocation){
        this.item = item;
        this.itemlocation = itemlocation;
    }

    public String getId() {
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public Item getItem(){
        return item;
    }

    public void setItem(Item item){
        this.item = item;
    }

    public String getItemlocation(){
        return itemlocation;
    }

    public void setItemlocation(String itemlocation){
        this.itemlocation = itemlocation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ItemLocation that = (ItemLocation) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (itemlocation != null ? !itemlocation.equals(that.itemlocation) : that.itemlocation != null) return false;
        return item != null ? item.equals(that.item) : that.item == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (item != null ? item.hashCode() : 0);
        result = 31 * result + (itemlocation != null ? itemlocation.hashCode() : 0);
        return result;
    }

}
