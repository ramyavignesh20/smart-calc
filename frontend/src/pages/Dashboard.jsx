import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CalculateIcon from "@mui/icons-material/Calculate";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import PercentIcon from "@mui/icons-material/Percent";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import FunctionsIcon from "@mui/icons-material/Functions";
import StraightenIcon from "@mui/icons-material/Straighten";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CalculatorCard from "../components/CalculatorCard";
import { useLanguage } from "../context/LanguageContext";

export default function Dashboard() {
  const {t} = useLanguage();
  const navigate = useNavigate();
  const cards = [
    ["bmi", "Calculate Body Mass Index", <MonitorWeightIcon />],
    ["math", "Add, subtract, multiply and divide", <CalculateIcon />],
    ["trigonometry", "Calculate sine, cosine and tangent", <ShowChartIcon />],
    ["interest", "Simple and compound interest", <PercentIcon />],
    ["discount", "Price and discount percentage", <PercentIcon />],
    ["root", "Square, cube and nth root", <FunctionsIcon />],
    ["land", "Convert square feet and cent", <SquareFootIcon />],
    ["length", "Feet, inch and centimeter", <StraightenIcon />],
    ["area", "Square, rectangle, circle and triangle", <HomeWorkIcon />]
  ];
  return <>
    <Box sx={{p:3}}>
      <Typography variant="h4" color="primary" fontWeight="bold">{t("welcome")}</Typography>
      <Typography color="text.secondary" sx={{mb:3}}>Choose a calculator to get started.</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, 2cm)", justifyContent: "center", gap: 1.5 }}>
        {cards.map(([key,desc,icon]) => (
          <Box key={key} sx={{ width: "2cm", height: "2cm" }}>
            <CalculatorCard title={t(key)} description={desc} icon={icon}
              onClick={() => navigate(`/calculator/${key}`)} />
          </Box>
        ))}
      </Box>
    </Box>
  </>;
}
