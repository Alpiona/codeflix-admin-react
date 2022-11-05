import * as React from 'react';
import { ThemeProvider } from '@mui/system';
import { Box, createTheme } from '@mui/material';
import Header from './components/Header';
import Layout from './components/Layout';

const theme = createTheme({})

export default function App() {
  return(
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{
        height: "100vh",
        backgroundColor: "#000"
      }}>
        <Header/>
        <Layout>
          <h1>Ola Mundo</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  )
}
