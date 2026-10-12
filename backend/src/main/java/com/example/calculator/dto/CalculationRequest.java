package com.example.calculator.dto;

public record CalculationRequest(
    Long userId,
    String calculatorType,
    String inputData,
    String result
) {}
