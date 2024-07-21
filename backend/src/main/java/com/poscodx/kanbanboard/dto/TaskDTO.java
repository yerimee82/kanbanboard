package com.poscodx.kanbanboard.dto;

import com.poscodx.kanbanboard.domain.TaskStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private List<TaskDTO> subTasks;
    private boolean isSubTask;

    // 생성자
    public TaskDTO(Long id, String title, String description, TaskStatus status, boolean isSubTask) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.isSubTask = isSubTask;
    }
}