package com.poscodx.kanbanboard.Service;

import com.poscodx.kanbanboard.Repository.BoardRepository;
import com.poscodx.kanbanboard.Repository.SectionRepository;
import com.poscodx.kanbanboard.domain.Board;
import com.poscodx.kanbanboard.domain.Section;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class SectionService {
    private final SectionRepository sectionRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public Long section(Long boardId, String name, int position) {
        Board board = boardRepository.findById(boardId).orElseThrow(() ->
                new IllegalArgumentException("Invalid board ID: " + boardId));

        Section section = Section.createSection(board, name, position);
        sectionRepository.save(section);
        return section.getId();
    }

    public Section findOne(Long sectionId) {
        return sectionRepository.findOne(sectionId);
    }

}
