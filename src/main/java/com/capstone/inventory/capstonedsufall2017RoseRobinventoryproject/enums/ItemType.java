package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.enums;

public enum ItemType {

    BOOK("book"),
    FURNITURE("home"),
    ELECTRONICS("power"),
    MISCELLANEOUS("clipboard"),
    MONITOR("monitor"),
    PRINTER("printer"),
    IPHONE("iphone"),
    TABLET("ipad"),
    LAPTOP("laptop"),
    CALCULATOR("calculator"),
    CAMERA("camera"),
    TOOL("settings"),
    FILECABINANT("filing");


    private String type;

    ItemType(String itemType){
        this.type = itemType;
    }

    public String getType() {
        return type;
    }
}
