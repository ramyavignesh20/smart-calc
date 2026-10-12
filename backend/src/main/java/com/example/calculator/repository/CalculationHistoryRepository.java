package com.example.calculator.repository;

import com.example.calculator.entity.CalculationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CalculationHistoryRepository extends JpaRepository<CalculationHistory, Long> {
    List<CalculationHistory> findByUserIdOrderByCreatedAtDesc(Long userId);
}
