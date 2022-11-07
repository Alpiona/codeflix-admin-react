import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete"

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories)

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
  }))

  const columns: GridColDef[] = [
    {
      field:"name", 
      headerName: "Name", 
      flex: 1,
    },
    {
      field:"createdAt",
      headerName:"Created At",
      flex: 1,
    },
    {
      field:"isActive",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell
    },
    {
      field:"id", 
      headerName: "Actions", 
      flex: 1,
      renderCell: renderActionCell
    },
  ]

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    )
  }

  function renderActionCell(rowData: GridRenderCellParams) {
    return (
      <IconButton 
        color="secondary"
        onClick={()=> console.log('clicked')}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    )
  }
  
  return (
    <Box maxWidth="lg" sx={{mt:4, mb:4}}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/category/create"
          style={{marginBottom: "1rem"}}
        >
          New Category
        </Button>
      </Box>

      <div style={{ height: 300, width: "100%"}}>
        <DataGrid 
          rows={rows} 
          columns={columns}
        />
      </div>

      {/* {categories.map((category) => (
        <Typography key={category.id}>{category.name}</Typography>
      ))} */}
    </Box>
  )}