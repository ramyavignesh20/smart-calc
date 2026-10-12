package com.example.calculator.controller;

import com.example.calculator.service.CalculatorService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {
    private final CalculatorService service;

    public CalculatorController(CalculatorService service) {
        this.service = service;
    }

    @GetMapping("/add")
    public double add(@RequestParam double a, @RequestParam double b) { return service.add(a,b); }

    @GetMapping("/subtract")
    public double subtract(@RequestParam double a, @RequestParam double b) { return service.subtract(a,b); }

    @GetMapping("/multiply")
    public double multiply(@RequestParam double a, @RequestParam double b) { return service.multiply(a,b); }

    @GetMapping("/divide")
    public double divide(@RequestParam double a, @RequestParam double b) { return service.divide(a,b); }

    @GetMapping("/bmi")
    public double bmi(@RequestParam double weight, @RequestParam double height) { return service.bmi(weight,height); }

    @GetMapping("/sqfeet-to-cent")
    public double sqFeetToCent(@RequestParam double value) { return service.sqFeetToCent(value); }

    @GetMapping("/cent-to-sqfeet")
    public double centToSqFeet(@RequestParam double value) { return service.centToSqFeet(value); }

    @GetMapping("/simple-interest")
    public double simpleInterest(@RequestParam double principal, @RequestParam double rate, @RequestParam double time) {
        return service.simpleInterest(principal,rate,time);
    }

    @GetMapping("/compound-interest")
    public double compoundInterest(@RequestParam double principal, @RequestParam double rate, @RequestParam double time) {
        return service.compoundInterest(principal,rate,time);
    }

    @GetMapping("/discount")
    public double discount(@RequestParam double price, @RequestParam double percent) {
        return service.discount(price,percent);
    }

    @GetMapping("/square-root")
    public double squareRoot(@RequestParam double value) { return service.squareRoot(value); }

    @GetMapping("/cube-root")
    public double cubeRoot(@RequestParam double value) { return service.cubeRoot(value); }

    @GetMapping("/nth-root")
    public double nthRoot(@RequestParam double value, @RequestParam double root) {
        return service.nthRoot(value,root);
    }

    @GetMapping("/feet-to-inch")
    public double feetToInch(@RequestParam double value) { return service.feetToInch(value); }

    @GetMapping("/inch-to-feet")
    public double inchToFeet(@RequestParam double value) { return service.inchToFeet(value); }

    @GetMapping("/feet-to-cm")
    public double feetToCm(@RequestParam double value) { return service.feetToCm(value); }

    @GetMapping("/cm-to-feet")
    public double cmToFeet(@RequestParam double value) { return service.cmToFeet(value); }

    @GetMapping("/inch-to-cm")
    public double inchToCm(@RequestParam double value) { return service.inchToCm(value); }

    @GetMapping("/cm-to-inch")
    public double cmToInch(@RequestParam double value) { return service.cmToInch(value); }

    @GetMapping("/square-area")
    public double squareArea(@RequestParam double side) { return service.squareArea(side); }

    @GetMapping("/rectangle-area")
    public double rectangleArea(@RequestParam double length, @RequestParam double width) {
        return service.rectangleArea(length,width);
    }

    @GetMapping("/circle-area")
    public double circleArea(@RequestParam double radius) { return service.circleArea(radius); }

    @GetMapping("/triangle-area")
    public double triangleArea(@RequestParam double base, @RequestParam double height) {
        return service.triangleArea(base,height);
    }
}
