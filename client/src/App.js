import React, { useState, useEffect } from "react";
import { CssBaseline, Container, Box, Switch, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Storekeeper from "./pages/Storekeeper"; // Componente para visualizar inventario

// Tema global
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  // Estado para el WebSocket y LED
  const [ws, setWs] = useState(null);
  const [ledStatus, setLedStatus] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("http://192.168.43.73:8080"); // Usa el protocolo ws://
    
    socket.onopen = () => {
      console.log("Conectado al servidor WebSocket");
      setWs(socket);
    };

    socket.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket cerrado");
      setWs(null);
    };

    return () => {
      if (socket) socket.close();
    };
  }, []);

  const toggleLed = () => {
    if (ws) {
      const newStatus = ledStatus ? "OFF" : "ON";
      ws.send(newStatus); // Envía el nuevo estado al servidor
      setLedStatus(!ledStatus);
    } else {
      console.log("WebSocket no conectado");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Control de LED e Inventario
          </Typography>

          {/* Widget de Control de LED */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              LED Status: {ledStatus ? "ON" : "OFF"}
            </Typography>
            <Switch
              checked={ledStatus}
              onChange={toggleLed}
              color="primary"
              inputProps={{ "aria-label": "control de LED" }}
            />
          </Box>

          {/* Sección de Inventario */}
          <Storekeeper /> {/* Renderiza la página del inventario */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
