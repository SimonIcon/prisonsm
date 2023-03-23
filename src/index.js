import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import Context from './api/context';


const theme = unstable_createMuiStrictModeTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Context>
      <App />
    </Context>


  </ThemeProvider>

);


