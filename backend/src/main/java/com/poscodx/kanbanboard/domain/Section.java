package com.poscodx.kanbanboard.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Section {
    @Id
    @GeneratedValue
    @Column(name = "section_id")
    private Long id;
    private String name;
    private int position;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @OneToMany(mappedBy = "section")
    private List<Task> tasks = new ArrayList<>();

    // === 연관관계 편의 메소드 ===
    public void setBoard(Board board) {
        this.board = board;
        if (!board.getSections().contains(this)) {
            board.getSections().add(this);
        }
    }

    public void addTask(Task task) {
        task.setSection(this);
        this.tasks.add(task);
    }

    public void removeTask(Task task) {
        task.setSection(null);
        this.tasks.remove(task);
    }

    // 생성자
    public static Section createSection(Board board, String name, int position) {
        Section section = new Section();
        section.setBoard(board);
        section.setName(name);
        section.setPosition(position);

        return section;
    }
}
