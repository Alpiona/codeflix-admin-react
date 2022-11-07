import { Box, Container } from '@mui/system'
import React from 'react'

export default function Layout({children}:{children: React.ReactNode}) {
  return (
    <Box>
      <Container 
        maxWidth="lg" 
        sx={{
          color: "white",
          mt:4, 
          mb:4, 
        }}>
        {children}
      </Container>
    </Box>
  )
}
