'use client'
// pages/employees.js
import React from 'react';



import { Grid, Paper, Typography,Avatar} from '@mui/material';


// Sample employee data
// const employees = [
//   { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', department: 'Engineering', position: 'Software Engineer', status: 'Active' },
//   { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', department: 'Marketing', position: 'Marketing Manager', status: 'Active' },
//   { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '234-567-8901', department: 'HR', position: 'HR Specialist', status: 'Inactive' },
//   { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', phone: '345-678-9012', department: 'Sales', position: 'Sales Representative', status: 'Active' },
//   { id: 5, name:'Luffy', email:'luffy@example.com',phone:'123-456-789',department:'Developer', Position:'Junior Developer', Status:'Inactive' },
//   {id: 6, name:'Zoro', email:'zoro@example.com',phone:'123-456-789',department:'sales', Position:'Sales Executive', Status:'active' },
 
// ];

const employeeNames =['johndoe','jane Smith','Alice Johnson', 'Bob Brown', 'Luffy', 'Zoro','arul','shdf'];
const departments = ['Engineering', 'Marketing', 'HR', 'Sales', 'Developer', 'Sales'];
const positions = ['Software Engineer', 'Marketing Manager', 'HR Specialist', 'Sales Representative', 'Junior Developer', 'Sales Executive'];
const statuses = ['Active', 'Active', 'Inactive', 'Active', 'Inactive', 'Active'];

const employees = employeeNames.map((name, index) => ({
    id: index + 1,
    name: name,
    email: `${name.split(' ').join('.').toLowerCase()}@example.com`,
    phone: `123-456-78${index}0`,
    department: departments[index],
    position: positions[index],
    status: statuses[index],
  }));
  

const EmployeeGrid = () => {
   

    // Function to handle search
    

    // Function to handle search - now imported from searchUtils
  
  return (

    <div style={{ padding: '20px' }}>
    {/* Search Field */}
    
    
   
    <Grid container spacing={4} style={{ padding: '70px', marginTop:'50px' }}>
         
      {employees.map((employee) => (
        <Grid item xs={12} sm={6} md={4} key={employee.id}>
           
          <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
         
            <Typography variant="h6" style={{ marginBottom: '10px' }}>{employee.name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
            <Typography variant="body1"><strong>Phone:</strong> {employee.phone}</Typography>
            <Typography variant="body1"><strong>Department:</strong> {employee.department}</Typography>
            <Typography variant="body1"><strong>Position:</strong> {employee.position}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {employee.status}</Typography>
            
          </Paper>
         
        </Grid>
       
       
      ))}
    </Grid>
    </div>
  );
 
};

export default EmployeeGrid;
