package com.poscodx.kanbanboard.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Member {
    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;
    private String name;

    @OneToOne(mappedBy = "member")
    private Board board;

    @OneToMany(mappedBy = "member")
    private List<Task> taskList = new ArrayList<>();
}
