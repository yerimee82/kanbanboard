package com.poscodx.kanbanboard.Service;

import com.poscodx.kanbanboard.Repository.BoardRepository;
import com.poscodx.kanbanboard.Repository.MemberRepository;
import com.poscodx.kanbanboard.Repository.SectionRepository;
import com.poscodx.kanbanboard.domain.Board;
import com.poscodx.kanbanboard.domain.Member;
import com.poscodx.kanbanboard.domain.Section;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InitService {
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final SectionRepository sectionRepository;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initializeData() {
        Member member = new Member();
        member.setName("Default User");
        memberRepository.save(member);

        Board board = Board.createBoard(member);
        boardRepository.save(board);

        createSection(board, "PENDING", 1);
        createSection(board, "IN_PROGRESS", 2);
        createSection(board, "COMPLETED", 3);
    }

    private void createSection(Board board, String name, int position) {
        Section section = Section.createSection(board, name, position);
        sectionRepository.save(section);
    }
}