package com.poscodx.kanbanboard.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter @Setter
public class Board {
    @Id @GeneratedValue
    @Column(name = "board_id")
    private Long id;
    private String name;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "board")
    private List<Section> sections = new ArrayList<>();


    // === 연관관계 편의 메소드 ===
    public void setMember(Member member) {
        this.member = member;
        if (member.getBoard() != this) {
            member.setBoard(this);
        }
    }

    // 생성 메소드
    public static Board createBoard(Member member) {
        Board board = new Board();
        board.setName("kanbanboard");
        board.setMember(member);
        return board;
    }

    // 섹션 이름으로 찾기
    public Section findSectionByName(String name) {
        for (Section section : this.sections) {
            if (section.getName().equalsIgnoreCase(name)) {
                return section;
            }
        }
        throw new IllegalArgumentException("No section found with name: " + name);
    }

    public Section getSectionByName(String name) {
        return sections.stream()
                .filter(section -> section.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Section not found: " + name));
    }
}
