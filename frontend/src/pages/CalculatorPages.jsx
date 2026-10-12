import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField as MuiTextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { saveHistory } from "../api/historyApi";

function TextField({ type, slotProps, ...props }) {
  return (
    <MuiTextField
      {...props}
      type={type}
      slotProps={{
        ...slotProps,
        ...(type === "number" && {
          htmlInput: {
            ...slotProps?.htmlInput,
            inputMode: "decimal",
            step: "any",
          },
        }),
      }}
    />
  );
}

function useCalculationHistory() {
  const [result, setResult] = useState("");
  const [historyError, setHistoryError] = useState("");

  const recordResult = (calculatorType, inputData, calculationResult) => {
    setResult(calculationResult);
    setHistoryError("");

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) {
        setHistoryError("Sign in to save calculations to history.");
        return;
      }

      saveHistory({
        userId: user.id,
        calculatorType,
        inputData: JSON.stringify(inputData),
        result: calculationResult,
      }).catch(() => {
        setHistoryError("Calculation completed, but could not be saved to history.");
      });
    } catch {
      setHistoryError("Calculation completed, but could not be saved to history.");
    }
  };

  return { result, setResult, historyError, recordResult };
}

// ======================================================
// COMMON CARD
// ======================================================

function CalculatorCard({ title, children, historyError }) {
  return (
    <Box sx={{ maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {title}
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "#F5F3FF",
        }}
      >
        {historyError && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {historyError}
          </Alert>
        )}
        {children}
      </Paper>
    </Box>
  );
}

// ======================================================
// BMI CALCULATOR
// ======================================================

export function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const { result, setResult, historyError, recordResult } = useCalculationHistory();

  const calculate = () => {
    const w = Number(weight);
    const h = Number(height);

    if (!w || !h || w <= 0 || h <= 0) {
      setResult("Please enter valid weight and height.");
      return;
    }

    const heightMeter = h / 100;
    const bmi = w / (heightMeter * heightMeter);

    recordResult("BMI Calculator", { weight, height }, `BMI = ${bmi.toFixed(2)}`);
  };

  return (
    <CalculatorCard title="BMI Calculator" historyError={historyError}>
      <TextField
        fullWidth
        label="Weight (kg)"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Height (cm)"
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" fullWidth onClick={calculate}>
        Calculate BMI
      </Button>

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {result}
        </Alert>
      )}
    </CalculatorCard>
  );
}

// ======================================================
// MATHEMATICAL CALCULATOR
// ======================================================

export function MathCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operation, setOperation] = useState("add");
  const { result, setResult, historyError, recordResult } = useCalculationHistory();

  const calculate = () => {
    const x = Number(a);
    const y = Number(b);

    if (a === "" || b === "") {
      setResult("Please enter both numbers.");
      return;
    }

    let value;

    switch (operation) {
      case "add":
        value = x + y;
        break;

      case "subtract":
        value = x - y;
        break;

      case "multiply":
        value = x * y;
        break;

      case "divide":
        if (y === 0) {
          setResult("Cannot divide by zero.");
          return;
        }
        value = x / y;
        break;

      default:
        value = 0;
    }

    recordResult("Mathematical Calculator", { a, b, operation }, `Result = ${value}`);
  };

  return (
    <CalculatorCard title="Mathematical Calculator" historyError={historyError}>
      <TextField
        fullWidth
        label="First Number"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Second Number"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>

        <Select
          value={operation}
          label="Operation"
          onChange={(e) => setOperation(e.target.value)}
        >
          <MenuItem value="add">Addition</MenuItem>
          <MenuItem value="subtract">Subtraction</MenuItem>
          <MenuItem value="multiply">Multiplication</MenuItem>
          <MenuItem value="divide">Division</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" fullWidth onClick={calculate}>
        Calculate
      </Button>

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {result}
        </Alert>
      )}
    </CalculatorCard>
  );
}

// ======================================================
// TRIGONOMETRY CALCULATOR
// ======================================================

export function TrigonometryCalculator() {
  const [angle, setAngle] = useState("");
  const [operation, setOperation] = useState("sin");
  const { result, setResult, historyError, recordResult } = useCalculationHistory();

  const calculate = () => {
    const degrees = Number(angle);
    if (angle.trim() === "" || !Number.isFinite(degrees)) {
      setResult("Please enter a valid angle in degrees.");
      return;
    }

    const radians = (degrees * Math.PI) / 180;
    if (!Number.isFinite(radians)) {
      setResult("Please enter a finite angle in degrees.");
      return;
    }

    const sine = Math.sin(radians);
    const cosine = Math.cos(radians);
    const denominator =
      operation === "tan" || operation === "sec"
        ? cosine
        : operation === "csc" || operation === "cot"
          ? sine
          : 1;
    if (Math.abs(denominator) < 1e-12) {
      const labels = { tan: "Tangent", sec: "Secant", csc: "Cosecant", cot: "Cotangent" };
      setResult(`${labels[operation]} is undefined for this angle.`);
      return;
    }

    const functions = {
      sin: () => sine,
      cos: () => cosine,
      tan: () => sine / cosine,
      sec: () => 1 / cosine,
      csc: () => 1 / sine,
      cot: () => cosine / sine,
    };
    const value = functions[operation]();
    const formattedValue = Math.abs(value) < 1e-12 ? "0" : value.toFixed(6);
    recordResult(
      "Trigonometry Calculator",
      { angle: degrees, operation, unit: "degrees" },
      `${operation}(${degrees}°) = ${formattedValue}`
    );
  };

  return (
    <CalculatorCard title="Trigonometry Calculator" historyError={historyError}>
      <TextField
        fullWidth
        label="Angle (degrees)"
        type="number"
        value={angle}
        onChange={(event) => setAngle(event.target.value)}
        helperText="Enter an angle in degrees, for example 30 or 90."
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={operation}
          label="Operation"
          onChange={(event) => setOperation(event.target.value)}
        >
          <MenuItem value="sin">Sine (sin)</MenuItem>
          <MenuItem value="cos">Cosine (cos)</MenuItem>
          <MenuItem value="tan">Tangent (tan)</MenuItem>
          <MenuItem value="csc">Cosecant (csc)</MenuItem>
          <MenuItem value="sec">Secant (sec)</MenuItem>
          <MenuItem value="cot">Cotangent (cot)</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" fullWidth onClick={calculate}>
        Calculate
      </Button>

      {result && (
        <Alert
          severity={
            result.includes("undefined") || result.includes("Please") || result.includes("finite")
              ? "error"
              : "success"
          }
          sx={{ mt: 2 }}
        >
          {result}
        </Alert>
      )}
    </CalculatorCard>
  );
}

// ======================================================
// INTEREST CALCULATOR
// ======================================================

export function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("simple");
  const { result, setResult, historyError, recordResult } = useCalculationHistory();

  const calculate = () => {
    const p = Number(principal);
    const r = Number(rate);
    const t = Number(time);

    if (
      principal === "" ||
      rate === "" ||
      time === "" ||
      p < 0 ||
      r < 0 ||
      t < 0
    ) {
      setResult("Please enter valid values.");
      return;
    }

    let interest;
    let total;

    if (type === "simple") {
      interest = (p * r * t) / 100;
      total = p + interest;
    } else {
      total = p * Math.pow(1 + r / 100, t);
      interest = total - p;
    }

    recordResult(
      "Interest Calculator",
      { principal, rate, time, type },
      `Interest = ${interest.toFixed(2)} | Total Amount = ${total.toFixed(2)}`
    );
  };

  return (
    <CalculatorCard title="Interest Calculator" historyError={historyError}>
      <TextField
        fullWidth
        label="Principal Amount"
        type="number"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Rate (%)"
        type="number"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Time (Years)"
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Interest Type</InputLabel>

        <Select
          value={type}
          label="Interest Type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="simple">Simple Interest</MenuItem>
          <MenuItem value="compound">Compound Interest</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" fullWidth onClick={calculate}>
        Calculate Interest
      </Button>

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {result}
        </Alert>
      )}
    </CalculatorCard>
  );
}

// ======================================================
// DISCOUNT CALCULATOR
// ======================================================

export function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const { result, setResult, historyError, recordResult } = useCalculationHistory();

  const calculate = () => {
    const p = Number(price);
    const d = Number(discount);

    if (price === "" || discount === "" || p < 0 || d < 0 || d > 100) {
      setResult("Please enter valid values. Discount must be 0-100%.");
      return;
    }

    const discountAmount = (p * d) / 100;
    const finalPrice = p - discountAmount;

    recordResult(
      "Discount Calculator",
      { price, discount },
      `Discount = ${discountAmount.toFixed(2)} | Final Price = ${finalPrice.toFixed(2)}`
    );
  };

  return (
    <CalculatorCard title="Discount Calculator" historyError={historyError}>
      <TextField
        fullWidth
        label="Original Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Discount (%)"
        type="number"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" fullWidth onClick={calculate}>
        Calculate Discount
      </Button>

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {result}
        </Alert>
      )}
    </CalculatorCard>
  );
}

// ======================================================
// ROOT CALCULATOR
// ======================================================

export function RootCalculator() {
  const [number, setNumber] = useState("");
  const [root, setRoot] = useState("2");
  const { result, setResult, historyError, recordResult } = useCalculationHistory();

  const calculate = () => {
    const n = Number(number);
    const r = Number(root);

    if (number === "" || root === "" || r <= 0) {
      setResult("Please enter valid values.");
      return;
    }

    if (n < 0 && r % 2 === 0) {
      setResult("Even root of a negative number is not a real number.");
      return;
    }

    let value;

    if (n < 0) {
      value = -Math.pow(Math.abs(n), 1 / r);
    } else {
      value = Math.pow(n, 1 / r);
    }

    recordResult("Root Calculator", { number, root }, `${r}th Root = ${value.toFixed(4)}`);
  };

  return (
    <CalculatorCard title="Root Calculator" historyError={historyError}>
      <TextField
        fullWidth
        label="Number"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Root"
        type="number"
        value={root}
        onChange={(e) => setRoot(e.target.value)}
        helperText="2 = Square Root, 3 = Cube Root"
        sx={{ mb: 2 }}
      />

      <Button variant="contained" fullWidth onClick={calculate}>
        Calculate Root
      </Button>

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {result}
        </Alert>
      )}
    </CalculatorCard>
  );
}

// ======================================================
// SQ FEET / CENT CALCULATOR
// ======================================================

export function LandCalculator() {
  const [value, setValue] = useState("");
  const [conversion, setConversion] = useState("sqfeetToCent");
  const { result, setResult, historyError, recordResult } = useCalculationHistory();

  const calculate = () => {
    const v = Number(value);

    if (value === "" || v < 0) {
      setResult("Please enter a valid value.");
      return;
    }

    let converted;

    if (conversion === "sqfeetToCent") {
      converted = v / 435.6;
      recordResult("Sq Feet ↔ Cent", { value, conversion }, `${v} sq.ft = ${converted.toFixed(4)} cent`);
    } else {
      converted = v * 435.6;
      recordResult("Sq Feet ↔ Cent", { value, conversion }, `${v} cent = ${converted.toFixed(2)} sq.ft`);
    }
  };

  return (
    <CalculatorCard title="Sq Feet ↔ Cent" historyError={historyError}>
      <TextField
        fullWidth
        label="Value"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Conversion</InputLabel>

        <Select
          value={conversion}
          label="Conversion"
          onChange={(e) => setConversion(e.target.value)}
        >
          <MenuItem value="sqfeetToCent">Sq Feet → Cent</MenuItem>
          <MenuItem value="centToSqfeet">Cent → Sq Feet</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" fullWidth onClick={calculate}>
        Convert
      </Button>

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {result}
        </Alert>
      )}
    </CalculatorCard>
  );
}

// ======================================================
// LENGTH CALCULATOR
// ======================================================

export function LengthCalculator() {
  const [value, setValue] = useState("");
  const [conversion, setConversion] = useState("feetToInch");
  const { result, setResult, historyError, recordResult } = useCalculationHistory();

  const calculate = () => {
    const v = Number(value);

    if (value === "" || v < 0) {
      setResult("Please enter a valid value.");
      return;
    }

    let converted;

    switch (conversion) {
      case "feetToInch":
        converted = v * 12;
        recordResult("Length Converter", { value, conversion }, `${v} feet = ${converted.toFixed(2)} inches`);
        break;

      case "inchToFeet":
        converted = v / 12;
        recordResult("Length Converter", { value, conversion }, `${v} inches = ${converted.toFixed(4)} feet`);
        break;

      case "feetToCm":
        converted = v * 30.48;
        recordResult("Length Converter", { value, conversion }, `${v} feet = ${converted.toFixed(2)} cm`);
        break;

      case "cmToFeet":
        converted = v / 30.48;
        recordResult("Length Converter", { value, conversion }, `${v} cm = ${converted.toFixed(4)} feet`);
        break;

      case "inchToCm":
        converted = v * 2.54;
        recordResult("Length Converter", { value, conversion }, `${v} inches = ${converted.toFixed(2)} cm`);
        break;

      case "cmToInch":
        converted = v / 2.54;
        recordResult("Length Converter", { value, conversion }, `${v} cm = ${converted.toFixed(4)} inches`);
        break;

      default:
        setResult("Invalid conversion.");
    }
  };

  return (
    <CalculatorCard title="Length Converter" historyError={historyError}>
      <TextField
        fullWidth
        label="Value"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Conversion</InputLabel>

        <Select
          value={conversion}
          label="Conversion"
          onChange={(e) => setConversion(e.target.value)}
        >
          <MenuItem value="feetToInch">Feet → Inch</MenuItem>
          <MenuItem value="inchToFeet">Inch → Feet</MenuItem>
          <MenuItem value="feetToCm">Feet → CM</MenuItem>
          <MenuItem value="cmToFeet">CM → Feet</MenuItem>
          <MenuItem value="inchToCm">Inch → CM</MenuItem>
          <MenuItem value="cmToInch">CM → Inch</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" fullWidth onClick={calculate}>
        Convert
      </Button>

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {result}
        </Alert>
      )}
    </CalculatorCard>
  );
}

// ======================================================
// AREA CALCULATOR
// ======================================================

export function AreaCalculator() {
  const [type, setType] = useState("square");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const { result, setResult, historyError, recordResult } = useCalculationHistory();

  const calculate = () => {
    const first = Number(a);
    const second = Number(b);

    if (a === "" || first < 0) {
      setResult("Please enter a valid value.");
      return;
    }

    if (
      (type === "rectangle" || type === "triangle") &&
      (b === "" || second < 0)
    ) {
      setResult("Please enter the second value.");
      return;
    }

    let area;

    switch (type) {
      case "square":
        area = first * first;
        break;

      case "rectangle":
        area = first * second;
        break;

      case "circle":
        area = Math.PI * first * first;
        break;

      case "triangle":
        area = (first * second) / 2;
        break;

      default:
        area = 0;
    }

    recordResult(
      "Area Calculator",
      { type, first: a, second: b },
      `Area = ${area.toFixed(2)} square units`
    );
  };

  return (
    <CalculatorCard title="Area Calculator" historyError={historyError}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Area Type</InputLabel>

        <Select
          value={type}
          label="Area Type"
          onChange={(e) => {
            setType(e.target.value);
            setResult("");
          }}
        >
          <MenuItem value="square">Square</MenuItem>
          <MenuItem value="rectangle">Rectangle</MenuItem>
          <MenuItem value="circle">Circle</MenuItem>
          <MenuItem value="triangle">Triangle</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label={
          type === "square"
            ? "Side"
            : type === "circle"
            ? "Radius"
            : type === "rectangle"
            ? "Length"
            : "Base"
        }
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        sx={{ mb: 2 }}
      />

      {(type === "rectangle" || type === "triangle") && (
        <TextField
          fullWidth
          label={type === "rectangle" ? "Width" : "Height"}
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}

      <Button variant="contained" fullWidth onClick={calculate}>
        Calculate Area
      </Button>

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {result}
        </Alert>
      )}
    </CalculatorCard>
  );
}