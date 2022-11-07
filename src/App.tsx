import { ThemeProvider } from '@mui/system';
import { Box, Typography } from '@mui/material';
import Header from './components/Header';
import Layout from './components/Layout';
import { appTheme } from './config/theme';
import { Route, Routes } from 'react-router-dom';
import { CategoryList } from './features/categories/ListCategory';
import { CategoryEdit } from './features/categories/EditCategory';
import { CategoryCreate } from './features/categories/CreateCategory';

export default function App() {
  return(
    <ThemeProvider theme={appTheme}>
      <Box component="main" sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.grey[900]
      }}>
        
        <Header/>
        <Layout>
          <h1>Welcome to React Router!</h1>
          <Routes>
            <Route path="/" element={<CategoryList />}></Route>
            <Route path="/categories" element={<CategoryList />}></Route>
            <Route path="/categories/create" element={<CategoryCreate />}></Route>
            <Route path="/categories/edit/:id" element={<CategoryEdit />}></Route>

            <Route path="*" element={
              <Box sx={{color: "white"}}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h2">Page not found!</Typography>
              </Box>
            }></Route>
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  )
}
