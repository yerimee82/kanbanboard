package com.poscodx.kanbanboard.Controller;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class TaskForm {
    private String title;
    private String description;
    private List<String> subtasks;
    private String status;
}
