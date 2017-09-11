package enums;

public enum OrgType {

    SCHOOL("school"),
    BUSINESS("business"),
    UTILITY("utility"),
    NONPROFIT("non-profit");

    private String type;

    OrgType(String typeName) {
        this.type = typeName;
    }

    public String getType() {
        return type;
    }
}
