package enums;

public enum ItemType {

    BOOK("book"),
    FURNITURE("furniture"),
    ELECTRONICS("electronic"),
    MISCELLANEOUS("miscellaneous");

    private String type;

    ItemType(String itemType){
        this.type = itemType;
    }

    public String getType() {
        return type;
    }
}
