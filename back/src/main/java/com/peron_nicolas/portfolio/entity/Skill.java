package com.peron_nicolas.portfolio.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private Byte percentage;

    @ManyToMany(mappedBy = "skills")
    private List<Project> projects = new ArrayList<>();

    public Skill(String name, Byte percentage) {
        this.name = name;
        this.percentage = percentage;
    }

    public Skill() {
        
    }
}
