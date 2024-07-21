package com.poscodx.kanbanboard.Repository;

import com.poscodx.kanbanboard.domain.Section;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class SectionRepository {
    private final EntityManager em;
    @Transactional
    public void save(Section section) {
        em.persist(section);
    }

    public Section findOne(Long id) {
        return em.find(Section.class, id);
    }
}
