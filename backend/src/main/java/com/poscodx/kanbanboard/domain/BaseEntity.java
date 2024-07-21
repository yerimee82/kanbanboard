package com.poscodx.kanbanboard.domain;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

import java.time.LocalDateTime;

@MappedSuperclass
public abstract class BaseEntity {
    @Column(updatable = false)
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
