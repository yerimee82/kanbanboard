package com.poscodx.kanbanboard.Service;

import com.poscodx.kanbanboard.Repository.TaskRepository;
import com.poscodx.kanbanboard.Repository.MemberRepository;
import com.poscodx.kanbanboard.domain.*;
import com.poscodx.kanbanboard.Controller.TaskForm;
import com.poscodx.kanbanboard.dto.TaskDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {
    private final TaskRepository taskRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Long createTask(Long memberId, TaskForm form) {
        Member member = memberRepository.findOne(memberId);
        Section section = member.getBoard().findSectionByName("PENDING");

        Task task = new Task();
        task.setTitle(form.getTitle());
        task.setDescription(form.getDescription());
        task.setStatus(TaskStatus.PENDING);
        task.setMember(member);
        task.setSection(section);

        for (String subtaskTitle : form.getSubtasks()) {
            Task subtask = new Task();
            subtask.setTitle(subtaskTitle);
            subtask.setStatus(TaskStatus.PENDING);
            subtask.setMember(member);
            task.addSubTask(subtask);
        }

        taskRepository.save(task);
        return task.getId();
    }

    public List<TaskDTO> findTasksByMember(Long memberId) {
        return taskRepository.findAllByMember(memberId).stream()
                .filter(task -> task.getParent() == null)
                .map(Task::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findOne(taskId);
        if (task != null) {
            if (task.getParent() != null) {
                task.getParent().removeSubTask(task);
            }
            task.getSection().getTasks().remove(task);
            task.setSection(null);
            task.setMember(null);
            taskRepository.remove(task);
        } else {
            throw new IllegalArgumentException("Invalid task ID: " + taskId);
        }
    }

    @Transactional
    public void updateTaskStatus(Long taskId, TaskStatus newStatus) {
        Task task = taskRepository.findOne(taskId);
        if (task != null) {
            task.setStatus(newStatus);
            task.updateStatus();
            if (task.getParent() != null) {
                task.getParent().updateStatus();
            }
        } else {
            throw new IllegalArgumentException("Invalid task ID: " + taskId);
        }
    }

    @Transactional
    public void updateTaskDetails(Long taskId, String title, String description) {
        Task task = taskRepository.findOne(taskId);
        if (task != null) {
            task.updateDetails(title, description);
        } else {
            throw new IllegalArgumentException("Invalid task ID: " + taskId);
        }
    }

    @Transactional
    public void addSubtask(Long taskId, String subtaskTitle) {
        Task task = taskRepository.findOne(taskId);
        if (task != null) {
            Task subtask = new Task();
            subtask.setTitle(subtaskTitle);
            subtask.setStatus(TaskStatus.PENDING);
            subtask.setMember(task.getMember());
            task.addSubTask(subtask);
        } else {
            throw new IllegalArgumentException("Invalid task ID: " + taskId);
        }
    }

    @Transactional
    public void updateSubtaskStatus(Long taskId, Long subtaskId, TaskStatus newStatus) {
        Task task = taskRepository.findOne(taskId);
        if (task != null) {
            task.getSubTasks().stream()
                    .filter(subtask -> subtask.getId().equals(subtaskId))
                    .findFirst()
                    .ifPresent(subtask -> {
                        subtask.setStatus(newStatus);
                        task.updateStatus();
                    });
        } else {
            throw new IllegalArgumentException("Invalid task ID: " + taskId);
        }
    }
}