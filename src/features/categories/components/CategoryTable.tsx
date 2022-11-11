import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Results } from "../../../types/Category"
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
}

export default function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete
}: Props){
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {debounceMs: 500}
    }
  }

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
      type: "string", 
      flex: 1,
      renderCell: renderActionCell
    },
  ]

  function mapDataToGridRows(data: Results){
    const {data: categories} = data;
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      isActive: category.is_active,
      createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
    }))
  }

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
        onClick={() => handleDelete(rowData.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    )
  }

  const rows = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total || 0;

  return (
    <Box sx={{display: "flex", height: 600}}>
      <DataGrid 
        rows={rows} 
        columns={columns}
        pageSize={perPage}
        rowCount={rowCount}
        loading={isFetching}
        filterMode={"server"}
        paginationMode={"server"}
        componentsProps={componentProps}
        disableColumnSelector={true}
        disableColumnFilter={true}
        disableDensitySelector={true}
        disableSelectionOnClick={true}
        components={{ Toolbar: GridToolbar}}
        onPageChange={handleOnPageChange}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
        checkboxSelection={false}
        rowsPerPageOptions={rowsPerPage}
      />
    </Box>
  )
}