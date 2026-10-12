package com.example.calculator.controller;

import com.example.calculator.dto.CalculationRequest;
import com.example.calculator.entity.CalculationHistory;
import com.example.calculator.repository.CalculationHistoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {
    private final CalculationHistoryRepository repository;

    public HistoryController(CalculationHistoryRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{userId}")
    public List<CalculationHistory> getHistory(@PathVariable Long userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @PostMapping
    public CalculationHistory save(@RequestBody CalculationRequest request) {
        CalculationHistory history = new CalculationHistory();
        history.setUserId(request.userId());
        history.setCalculatorType(request.calculatorType());
        history.setInputData(request.inputData());
        history.setResult(request.result());
        return repository.save(history);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
