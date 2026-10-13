import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import { saveHistory } from "../api/historyApi";

const operations = {
  add: { label: "Add", symbol: "+" },
  subtract: { label: "Subtract", symbol: "−" },
  multiply: { label: "Multiply", symbol: "×" },
  divide: { label: "Divide", symbol: "÷" },
};

function calculate(first, second, operation) {
  switch (operation) {
    case "add":
      return first + second;
    case "subtract":
      return first - second;
    case "multiply":
      return first * second;
    case "divide":
      return second === 0 ? null : first / second;
    default:
      return null;
  }
}

function formatResult(value) {
  return Number.parseFloat(value.toPrecision(12)).toString();
}

export default function Dashboard() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operation, setOperation] = useState("");
  const [awaitingSecondOperand, setAwaitingSecondOperand] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const enterDigit = (digit) => {
    if (display === "Error" || display === "Cannot divide by zero" || awaitingSecondOperand) {
      setDisplay(digit === "." ? "0." : digit);
      setAwaitingSecondOperand(false);
      return;
    }

    if (digit === "." && display.includes(".")) return;
    if (display.replace(".", "").length >= 14) return;
    setDisplay((current) => (current === "0" && digit !== "." ? digit : current + digit));
  };

  const chooseOperation = (nextOperation) => {
    if (display === "Error" || display === "Cannot divide by zero") return;

    let nextFirstOperand = firstOperand;
    if (firstOperand === null) {
      nextFirstOperand = Number(display);
    } else if (!awaitingSecondOperand) {
      const intermediate = calculate(firstOperand, Number(display), operation);
      if (intermediate === null || !Number.isFinite(intermediate)) {
        setDisplay("Error");
        setFirstOperand(null);
        setOperation("");
        setAwaitingSecondOperand(true);
        return;
      }
      nextFirstOperand = intermediate;
      setDisplay(formatResult(intermediate));
    }

    setFirstOperand(nextFirstOperand);
    setOperation(nextOperation);
    setAwaitingSecondOperand(true);
    setHistoryError("");
  };

  const clear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperation("");
    setAwaitingSecondOperand(false);
    setHistoryError("");
  };

  const backspace = () => {
    if (display === "Error" || awaitingSecondOperand) {
      setDisplay("0");
      setAwaitingSecondOperand(false);
      return;
    }
    setDisplay((current) => {
      const shortened = current.slice(0, -1);
      return !shortened || shortened === "-" ? "0" : shortened;
    });
  };

  const toggleSign = () => {
    if (display === "Error" || display === "Cannot divide by zero" || display === "0") return;
    setDisplay((current) => (current.startsWith("-") ? current.slice(1) : `-${current}`));
  };

  const evaluate = () => {
    if (firstOperand === null || !operation || awaitingSecondOperand) return;

    const secondOperand = Number(display);
    const value = calculate(firstOperand, secondOperand, operation);
    if (value === null) {
      setDisplay("Cannot divide by zero");
      setFirstOperand(null);
      setOperation("");
      setAwaitingSecondOperand(true);
      return;
    }
    if (!Number.isFinite(value)) {
      setDisplay("Error");
      setFirstOperand(null);
      setOperation("");
      setAwaitingSecondOperand(true);
      return;
    }

    const formattedValue = formatResult(value);
    setDisplay(formattedValue);
    setFirstOperand(null);
    setOperation("");
    setAwaitingSecondOperand(true);
    setHistoryError("");

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) {
        setHistoryError("Calculation complete. Sign in to save it to history.");
        return;
      }

      saveHistory({
        userId: user.id,
        calculatorType: "Mathematical Calculator",
        inputData: JSON.stringify({
          a: firstOperand,
          b: secondOperand,
          operation,
        }),
        result: `Result = ${formattedValue}`,
      }).catch(() => {
        setHistoryError("Calculation complete, but it could not be saved to history.");
      });
    } catch {
      setHistoryError("Calculation complete, but it could not be saved to history.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (/^[0-9.]$/.test(event.key)) {
        event.preventDefault();
        enterDigit(event.key);
      } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        evaluate();
      } else if (event.key === "Backspace") {
        event.preventDefault();
        backspace();
      } else if (event.key === "Escape") {
        clear();
      } else if (event.key === "+") {
        chooseOperation("add");
      } else if (event.key === "-") {
        chooseOperation("subtract");
      } else if (event.key === "*") {
        chooseOperation("multiply");
      } else if (event.key === "/") {
        event.preventDefault();
        chooseOperation("divide");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const keys = [
    { label: "Clear", action: clear, utility: true },
    { label: "±", action: toggleSign, utility: true },
    { label: "Backspace", action: backspace, utility: true, icon: true },
    { label: operations.divide.symbol, action: () => chooseOperation("divide"), operation: "divide" },
    { label: "7", action: () => enterDigit("7") },
    { label: "8", action: () => enterDigit("8") },
    { label: "9", action: () => enterDigit("9") },
    { label: operations.multiply.symbol, action: () => chooseOperation("multiply"), operation: "multiply" },
    { label: "4", action: () => enterDigit("4") },
    { label: "5", action: () => enterDigit("5") },
    { label: "6", action: () => enterDigit("6") },
    { label: operations.subtract.symbol, action: () => chooseOperation("subtract"), operation: "subtract" },
    { label: "1", action: () => enterDigit("1") },
    { label: "2", action: () => enterDigit("2") },
    { label: "3", action: () => enterDigit("3") },
    { label: operations.add.symbol, action: () => chooseOperation("add"), operation: "add" },
    { label: "0", action: () => enterDigit("0"), wide: true },
    { label: ".", action: () => enterDigit(".") },
    { label: "=", action: evaluate, equals: true },
  ];

  return (
    <Box
      className="dashboard-page"
      sx={{
        minHeight: 0,
        display: "grid",
        placeItems: "center",
        px: { xs: 1.5, sm: 2 },
        py: { xs: 0.75, sm: 1.25, md: 1.5 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 440 }}>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.25, sm: 2 },
            border: 1,
            borderColor: "divider",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Box
            aria-live="polite"
            sx={{
              minHeight: "clamp(68px, 12vh, 104px)",
              mb: 1,
              px: 2,
              py: 1.25,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              borderRadius: 2.5,
              bgcolor: "#171717",
              color: "#ffffff",
              overflow: "hidden",
            }}
          >
            <Typography variant="body2" sx={{ color: "#a3a3a3", minHeight: 22 }}>
              {firstOperand !== null && operation
                ? `${formatResult(firstOperand)} ${operations[operation].symbol}`
                : " "}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                maxWidth: "100%",
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
                fontSize: display.length > 12 ? "1.75rem" : "2.5rem",
                lineHeight: 1.2,
                overflowWrap: "anywhere",
                textAlign: "right",
              }}
            >
              {display}
            </Typography>
          </Box>

          {historyError && (
            <Alert severity="info" sx={{ mb: 1 }}>
              {historyError}
            </Alert>
          )}

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 0.75 }}>
            {keys.map(({ label, action, utility, icon, wide, equals, operation: keyOperation }) => (
              <Button
                key={label}
                variant={equals ? "contained" : "outlined"}
                aria-label={icon ? label : undefined}
                onClick={action}
                sx={{
                  minWidth: 0,
                  minHeight: "clamp(38px, 6.5vh, 54px)",
                  gridColumn: wide ? "span 2" : undefined,
                  borderColor: utility || keyOperation ? "transparent" : "divider",
                  bgcolor: utility ? "#f0f0f0" : equals || keyOperation ? "primary.main" : "#ffffff",
                  color: utility ? "text.secondary" : equals || keyOperation ? "#ffffff" : "text.primary",
                  fontSize: utility ? "0.875rem" : "1.125rem",
                  "&:hover": {
                    bgcolor: equals || keyOperation ? "primary.light" : utility ? "#e5e5e5" : "#f5f5f5",
                    borderColor: "text.secondary",
                  },
                }}
              >
                {icon ? <BackspaceOutlinedIcon fontSize="small" /> : label}
              </Button>
            ))}
          </Box>
        
        </Paper>
      </Box>
    </Box>
  );
}
