package com.example.calculator.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "calculation_history")
public class CalculationHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "calculator_type", nullable = false)
    private String calculatorType;

    @Column(name = "input_data", columnDefinition = "TEXT")
    private String inputData;

    @Column(nullable = false)
    private String result;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void beforeInsert() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getCalculatorType() { return calculatorType; }
    public void setCalculatorType(String calculatorType) { this.calculatorType = calculatorType; }
    public String getInputData() { return inputData; }
    public void setInputData(String inputData) { this.inputData = inputData; }
    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
