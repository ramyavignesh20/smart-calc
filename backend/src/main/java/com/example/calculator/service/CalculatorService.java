package com.example.calculator.service;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public double add(double a, double b) { return a + b; }
    public double subtract(double a, double b) { return a - b; }
    public double multiply(double a, double b) { return a * b; }

    public double divide(double a, double b) {
        if (b == 0) throw new IllegalArgumentException("Cannot divide by zero");
        return a / b;
    }

    public double bmi(double weight, double heightCm) {
        if (heightCm <= 0 || weight < 0) throw new IllegalArgumentException("Invalid BMI input");
        double meters = heightCm / 100.0;
        return weight / (meters * meters);
    }

    public double sqFeetToCent(double value) { return value / 435.6; }
    public double centToSqFeet(double value) { return value * 435.6; }

    public double simpleInterest(double principal, double rate, double time) {
        return principal * rate * time / 100.0;
    }

    public double compoundInterest(double principal, double rate, double time) {
        return principal * (Math.pow(1 + rate / 100.0, time) - 1);
    }

    public double discount(double price, double percent) {
        return price * percent / 100.0;
    }

    public double squareRoot(double value) { return Math.sqrt(value); }
    public double cubeRoot(double value) { return Math.cbrt(value); }

    public double nthRoot(double value, double root) {
        if (root == 0) throw new IllegalArgumentException("Root cannot be zero");
        return Math.pow(value, 1.0 / root);
    }

    public double feetToInch(double value) { return value * 12; }
    public double inchToFeet(double value) { return value / 12; }
    public double feetToCm(double value) { return value * 30.48; }
    public double cmToFeet(double value) { return value / 30.48; }
    public double inchToCm(double value) { return value * 2.54; }
    public double cmToInch(double value) { return value / 2.54; }

    public double squareArea(double side) { return side * side; }
    public double rectangleArea(double length, double width) { return length * width; }
    public double circleArea(double radius) { return Math.PI * radius * radius; }
    public double triangleArea(double base, double height) { return 0.5 * base * height; }
}
