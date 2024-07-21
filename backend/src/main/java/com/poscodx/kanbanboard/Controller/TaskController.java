package com.poscodx.kanbanboard.Controller;

import com.poscodx.kanbanboard.Service.TaskService;
import com.poscodx.kanbanboard.domain.TaskStatus;
import com.poscodx.kanbanboard.dto.TaskDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Long> createTask(@RequestBody TaskForm form) {
        Long taskId = taskService.createTask(1L, form);
        return ResponseEntity.ok(taskId);
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasks() {
        List<TaskDTO> tasks = taskService.findTasksByMember(1L);
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{taskId}/status")
    public ResponseEntity<Void> updateTaskStatus(@PathVariable Long taskId, @RequestParam TaskStatus status) {
        taskService.updateTaskStatus(taskId, status);
        return ResponseEntity.ok().build();
    }
}