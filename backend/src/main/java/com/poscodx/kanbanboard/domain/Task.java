package com.poscodx.kanbanboard.domain;

import com.poscodx.kanbanboard.dto.TaskDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter @Setter
public class Task {
    @Id
    @GeneratedValue
    @Column(name = "task_id")
    private Long id;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Task parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> subTasks = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    private Section section;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // === 연관관계 편의 메소드 ===
    public void setSection(Section section) {
        if (this.section != null) {
            this.section.getTasks().remove(this);
        }
        this.section = section;
        if (section != null) {
            section.getTasks().add(this);
        }
    }

    public void addSubTask(Task subTask) {
        subTask.setParent(this);
        this.subTasks.add(subTask);
    }

    public void removeSubTask(Task subTask) {
        subTask.setParent(null);
        this.subTasks.remove(subTask);
    }

    public TaskDTO toDTO() {
        boolean isSubTask = this.parent != null;
        TaskDTO dto = new TaskDTO(this.id, this.title, this.description, this.status, isSubTask);
        if (!isSubTask && this.subTasks != null && !this.subTasks.isEmpty()) {
            dto.setSubTasks(this.subTasks.stream().map(Task::toDTO).collect(Collectors.toList()));
        }
        return dto;
    }

    // === 비즈니스 로직 ===
    public void updateDetails(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public void updateStatus() {
        if (this.subTasks.isEmpty()) {
            return;
        }

        long doneCount = this.subTasks.stream()
                .filter(subTask -> subTask.getStatus() == TaskStatus.DONE)
                .count();

        if (doneCount == this.subTasks.size()) {
            this.status = TaskStatus.DONE;
        } else if (doneCount > 0) {
            this.status = TaskStatus.IN_PROGRESS;
        } else {
            this.status = TaskStatus.PENDING;
        }

        updateSection();
    }

    private void updateSection() {
        if (this.section != null && this.section.getBoard() != null) {
            String sectionName = this.status.name();
            Section newSection = this.section.getBoard().findSectionByName(sectionName);
            this.setSection(newSection);
        }
    }
}