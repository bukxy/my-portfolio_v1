package com.peron_nicolas.portfolio.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

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

    @Column(nullable = false)
    private LocalDate dateStart;

    private LocalDate dateEnd;

    public Project(String name, String url, Boolean isGithub, String description, LocalDate dateStart, LocalDate dateEnd){
        this.name = name;
        this.url = url;
        this.isGithub = isGithub;
        this.description = description;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    public Project() {}
}

