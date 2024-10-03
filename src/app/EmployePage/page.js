//employee page
'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';


const roles = ['Market', 'Finance', 'Development'];

const randomId = () => Math.floor(Math.random() * 10000);
const randomTraderName = () => {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma'];
  return names[Math.floor(Math.random() * names.length)];
};
const randomCreatedDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 100));
  return date; 
};
const randomRole = () => roles[Math.floor(Math.random() * roles.length)];


const initialRows = Array.from({ length: 5 }, () => ({
  id: randomId(),
  name: randomTraderName(),
  age: Math.floor(Math.random() * 50) + 20, 
  joinDate: randomCreatedDate(),
  role: randomRole(),
}));

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId(); 
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', role: '', joinDate: new Date(), isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [isGridVisible, setIsGridVisible] = React.useState(false); 

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

 

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((oldRows) => oldRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  
  const handleSubmit = () => {
    alert('Submitted!');
    console.log(rows);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'joinDate',
      headerName: 'Join date',
      type: 'date',
      width: 180,
      editable: true,
      valueGetter: (params) => {
        return params.value; 
      },
    },
    {
      field: 'role',
      headerName: 'Department',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Market', 'Finance', 'Development'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        const { id } = params;

        return [
          
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key={`delete-${id}`}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        color="primary"
        sx={{ float: 'right' }}
        onClick={() => setIsGridVisible(true)} 
        startIcon={<AddIcon />}
      >
        Add Employee
      </Button>

      {isGridVisible && (
        <>
          <Button
            color="secondary"
            onClick={() => {
              setIsGridVisible(false); 
              setRowModesModel({}); 
            }} 
          >
            Cancel
          </Button>

          <Button
            color="success"
            sx={{ float: 'right', marginRight: '10px' }} 
            onClick={handleSubmit}
          >
            Submit
          </Button>



          <Box
            sx={{
              height: 500,
              width: '100%',
              '& .actions': {
                color: 'text.secondary',
              },
              '& .textPrimary': {
                color: 'text.primary',
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slots={{
                toolbar: EditToolbar,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
