import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete"

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories)

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {debounceMs: 500}
    }
  }

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
      renderCell: renderNameCell
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

  function renderNameCell(rowData: GridRenderCellParams) { 
    return (
      <Link
        style={{textDecoration: "none"}}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
  )
}

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

      <Box sx={{ display: "flex", height: 600}}>
        <DataGrid 
          components={{Toolbar: GridToolbar}}
          componentsProps= {componentProps}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableDensitySelector={true}
          disableSelectionOnClick={true}
          rowsPerPageOptions={[2,20,50,100]}
          rows={rows} 
          columns={columns}
        />
      </Box>
    </Box>
  )}