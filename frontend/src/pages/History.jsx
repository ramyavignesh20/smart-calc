import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getHistory, deleteHistory } from "../api/historyApi";

function formatInputData(item) {
  if (!item.inputData) return "";

  try {
    const input = JSON.parse(item.inputData);
    if (item.calculatorType === "Trigonometry Calculator") {
      return `${input.operation}(${input.angle}°)`;
    }
    return Object.entries(input)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  } catch {
    return item.inputData;
  }
}

export default function History() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    if (!user.id) return;
    try {
      setItems(await getHistory(user.id));
      setError("");
    } catch {
      setError("Could not load calculation history. Please try again.");
    }
  };
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    try {
      await deleteHistory(id);
      await load();
    } catch {
      setError("Could not delete this calculation. Please try again.");
    }
  };

  return <>
    <Box sx={{ px: { xs: 2, sm: 3, lg: 5 }, py: { xs: 4, sm: 6 }, maxWidth: 1440, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Calculation History</Typography>
      <Card>
        <CardContent>
          {error && <Typography color="error" role="alert" sx={{ mb: 2 }}>{error}</Typography>}
          <List>
            {items.map(item => (
              <ListItem key={item.id} divider secondaryAction={
                <IconButton onClick={()=>remove(item.id)}><DeleteIcon /></IconButton>
              }>
                <ListItemText
                  primary={`${item.calculatorType}: ${item.result}`}
                  secondary={[formatInputData(item), item.createdAt].filter(Boolean).join(" • ")}
                />
              </ListItem>
            ))}
            {!items.length && <Typography color="text.secondary">No calculation history yet.</Typography>}
          </List>
        </CardContent>
      </Card>
    </Box>
  </>;
}
