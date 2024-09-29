import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

export const CListCard = ({ selectedTab }) => {
  return (
    <Paper style={{ margin: "100px", padding: "10px" }} elevation={5}>
      <h2 style={{ display: "flex", justifyContent: "space-between" }}>
        {selectedTab?.label}
        <Tooltip title="Agregar" arrow placement="left">
          <Button
            variant="contained"
            onClick={() => {}}
            className="c-ml-5 c-btn-success"
          >
            <Add />
          </Button>
        </Tooltip>
      </h2>
      <Divider />
      {Boolean(selectedTab?.itemlist.length) && (
        <Grid2 container className="c-grid-results" style={{ padding: 0 }}>
          <Grid2 item md={12} xs={12}>
            <TableContainer>
              <Table className="c-table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>DETALLE</TableCell>
                    <TableCell>OPCIONES</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedTab?.itemlist?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Tooltip title="Eliminar" arrow>
                          <IconButton
                            className="c-grid-btn-cancel button-grid"
                            onClick={() => {}}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
        </Grid2>
      )}
    </Paper>
  );
};
