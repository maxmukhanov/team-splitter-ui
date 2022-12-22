import React from 'react';
import { CssBaseline, Box, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes as appRoutes } from './routes';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { compose } from './utils/ComposeUtils';
import withConfiguration, {
  isConfigured,
} from './services/context/ConfigurationContext';

function App() {
  // define theme
  const theme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height="100vh" display="flex" flexDirection="column">
          <Router>
            <Navbar />
            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
            <Footer />
          </Router>
        </Box>
      </ThemeProvider>

    </div>
  );
}

export default App;
