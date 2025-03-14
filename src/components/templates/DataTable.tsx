import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../styles/theme";

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  error?: string | null;
  checkboxSelection?: boolean;
  height?: string;
  getRowHeight?: () => number | "auto";
}

export const DataTable = ({
  columns,
  rows,
  checkboxSelection = false,
  height = "75vh",
  getRowHeight,
}: DataTableProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      m="40px 0 0 0"
      height={height}
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: `${colors.blueAccent[700]} !important`,
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: `${colors.blueAccent[700]} !important`,
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid
        checkboxSelection={checkboxSelection}
        rows={rows}
        columns={columns}
        getRowHeight={getRowHeight}
      />
    </Box>
  );
};
