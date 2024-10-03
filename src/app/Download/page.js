
'use client'
import Grid from '@mui/material/Grid2';

import React from 'react';
import {  Paper, Typography, Button,Avatar } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // For table formatting in PDF
import * as XLSX from 'xlsx';

// Sample employee data
const employeeNames = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Luffy', 'Zoro'];
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

  // Function to download employee data as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Employee Details', 10, 10);
    
    const employeeData = employees.map(emp => [
      emp.name,
      emp.email,
      emp.phone,
      emp.department,
      emp.position,
      emp.status,
    ]);

    autoTable(doc, {
      head: [['Name', 'Email', 'Phone', 'Department', 'Position', 'Status']],
      body: employeeData,
    });

    doc.save('employee_data.pdf');
  };

  // Function to download employee data as Excel (XLSX)
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, 'employee_data.xlsx');
  };

  return (
    <div style={{ display:'flex', flexWrap:'wrap' }}>
       
      <Grid container spacing={4} style={{ padding: '30px', marginTop: '50px' }}>
      
        {employees.map((employee) => (
          <Grid item xs={4} sm={6} md={4} key={employee.id}>
            <Paper elevation={3} style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
               {/* Avatar for each employee */}
               <Avatar 
                alt={employee.name} 
                src={employee.avatar} 
                style={{ width: '50px', height: '50px', marginLeft: '300px' }}
              />
              
              <Typography variant="h6" style={{ justifyContent:'space-between',display:'flex',flexWrap:'wrap' }}>{employee.name}</Typography>
              
              <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {employee.phone}</Typography>
              <Typography variant="body1"><strong>Department:</strong> {employee.department}</Typography>
              <Typography variant="body1"><strong>Position:</strong> {employee.position}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {employee.status}</Typography>
             
              {/* Buttons for individual download */}
              <div style={{ marginTop: '10px' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => downloadPDF(employee)} 
                  style={{ marginRight: '10px' }}
                >
                  Download as PDF
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => downloadExcel(employee.id)}
                >
                  Download as Excel
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EmployeeGrid;
