package com.poscodx.kanbanboard.Repository;

import com.poscodx.kanbanboard.domain.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;

    // 사용자 저장
    @Transactional
    public void save(Member member) {
        em.persist(member);
    }

    // 사용자 찾기
    public Member findOne(Long id) {
        return em.find(Member.class, id);
    }
}
