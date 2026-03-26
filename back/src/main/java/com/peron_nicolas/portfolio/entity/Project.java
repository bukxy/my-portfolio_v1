package com.peron_nicolas.portfolio.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String url;

    @Column(nullable = false)
    private Boolean isGithub = false;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Project(String name, String url, Boolean isGithub, String description){
        this.name = name;
        this.url = url;
        this.isGithub = isGithub;
        this.description = description;
    }

    public Project() {}
}

