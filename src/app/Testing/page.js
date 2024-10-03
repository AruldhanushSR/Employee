// pages/Testing/parent.js
import { Button, Box, Typography } from "@mui/material";
import React from 'react';
import Link from 'next/link'; // Import Link from next/link

const Page = () => {
  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
  
      <Button
        variant="contained"    
        sx={{ margin: '0 10px' }} // Adds horizontal margin between buttons
      >
        OverView
      </Button>

      <Link href="/Testing/EmployeTask" passHref>
        <Button
          variant="outlined" 
          sx={{ margin: '0 10px' }} // Adds horizontal margin between buttons
        >
          Employe Tasks
        </Button>
      </Link>
    
      <Button
        variant="contained"    
        sx={{ margin: '0 10px' }} // Adds horizontal margin between buttons
      >
        Expenses
      </Button>

      <Button
        variant="outlined"  
        sx={{ margin: '0 10px' }} // Adds horizontal margin between buttons
      >
        Leave Attendance
      </Button>
    </Box>
  );
}

export default Page;
