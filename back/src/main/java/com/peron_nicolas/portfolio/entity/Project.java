package com.peron_nicolas.portfolio.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
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

    @Column
    private String shortDescription;

    @Column(nullable = false)
    private LocalDate dateStart;

    private LocalDate dateEnd;

    @ManyToMany
    @JoinTable(name = "project_skill",
            joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id",
                    referencedColumnName = "id"))
    private List<Skill> skills = new ArrayList<>();

    public Project(String name, String url, Boolean isGithub, String description, String shortDescription, LocalDate dateStart, LocalDate dateEnd){
        this.name = name;
        this.url = url;
        this.isGithub = isGithub;
        this.description = description;
        this.shortDescription = shortDescription;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    public Project() {}
}

