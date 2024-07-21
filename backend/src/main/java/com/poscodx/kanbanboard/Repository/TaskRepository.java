package com.poscodx.kanbanboard.Repository;

import com.poscodx.kanbanboard.domain.Task;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TaskRepository {
    private final EntityManager em;
    @Transactional
    public void save(Task task) {
        em.persist(task);
    }

    public Task findOne(Long id) {
        return em.find(Task.class, id);
    }

    public List<Task> findAllByMember(Long memberId) {
        return em.createQuery("select t from Task t where t.member.id = :memberId", Task.class)
                .setParameter("memberId", memberId)
                .getResultList();

    }

    @Transactional
    public void remove(Task task) {
        em.remove(task);
    }
}
