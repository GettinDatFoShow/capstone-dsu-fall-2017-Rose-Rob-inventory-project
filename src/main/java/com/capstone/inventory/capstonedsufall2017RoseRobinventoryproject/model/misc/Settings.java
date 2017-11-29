package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.misc;

import javax.persistence.*;

@Entity
@Table(name="settings")
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private String id;

    @Column(name="audit_selection")
    private Integer auditSelection;

    private Settings() {

    }

    public Settings(Integer auditSelection) {
        this.auditSelection = auditSelection;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getAuditSelection() {
        return auditSelection;
    }

    public void setAuditSelection(Integer auditSelection) {
        this.auditSelection = auditSelection;
    }
}
