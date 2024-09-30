import { Add, Delete, Edit, CheckCircle, Undo } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Grid2,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

export const CListCard = ({ selectedTab, setTabs, tabs }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentItem, setCurrentItem] = useState({ name: "", quantity: 1 });

  const handleOpenModal = () => {
    setModalMode("add");
    setCurrentItem({ name: "", quantity: 1 });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const updateTabItems = (updatedItems) => {
    const updatedTabs = tabs.map((tab) =>
      tab.value === selectedTab.value ? { ...tab, itemlist: updatedItems } : tab
    );
    setTabs(updatedTabs);
  };

  const handleAddItem = () => {
    if (currentItem.name && currentItem.quantity > 0) {
      const newItem = { ...currentItem, isComplete: false };
      const updatedItems = [...selectedTab.itemlist, newItem];
      updateTabItems(updatedItems);
      setOpenModal(false);
    }
  };

  const handleEditItem = () => {
    const updatedItems = selectedTab.itemlist.map((item, index) =>
      index === currentItem.index
        ? { ...currentItem, isComplete: item.isComplete }
        : item
    );
    updateTabItems(updatedItems);
    setOpenModal(false);
  };

  const handleMarkAsComplete = (index) => {
    const updatedItems = selectedTab.itemlist.map((item, i) =>
      i === index ? { ...item, isComplete: !item.isComplete } : item
    );
    updateTabItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = selectedTab.itemlist.filter((_, i) => i !== index);
    updateTabItems(updatedItems);
  };

  const openEditModal = (item, index) => {
    setModalMode("edit");
    setCurrentItem({ ...item, index });
    setOpenModal(true);
  };

  return (
    <Paper
      style={{
        margin: "20px",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
      elevation={0}
    >
      <h2 style={{ display: "flex", justifyContent: "space-between" }}>
        {selectedTab?.label}
        <Tooltip title="Agregar" arrow placement="left">
          <Button variant="outlined" onClick={handleOpenModal}>
            <Add />
          </Button>
        </Tooltip>
      </h2>
      <Divider sx={{ marginBottom: 2 }} />
      {Boolean(selectedTab.itemlist.length) ? (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Detalle</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedTab.itemlist
                .sort((a, b) => a.isComplete - b.isComplete)
                .map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      textDecoration: item.isComplete ? "line-through" : "none",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar" arrow>
                        <IconButton onClick={() => openEditModal(item, index)}>
                          <Edit fontSize="small" sx={{ color: "#607d8b" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar" arrow>
                        <IconButton onClick={() => handleDeleteItem(index)}>
                          <Delete fontSize="small" sx={{ color: "#e57373" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          item.isComplete ? "Desmarcar" : "Marcar como comprado"
                        }
                        arrow
                      >
                        <IconButton onClick={() => handleMarkAsComplete(index)}>
                          {item.isComplete ? (
                            <Undo fontSize="small" sx={{ color: "#ffa726" }} />
                          ) : (
                            <CheckCircle
                              fontSize="small"
                              sx={{ color: "#81c784" }}
                            />
                          )}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No hay productos en esta lista.
        </Typography>
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {modalMode === "add" ? "Agregar Producto" : "Editar Producto"}
          </Typography>
          <TextField
            fullWidth
            label="Detalle"
            value={currentItem.name}
            onChange={(e) =>
              setCurrentItem((prev) => ({ ...prev, name: e.target.value }))
            }
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Cantidad"
            type="number"
            value={currentItem.quantity}
            onChange={(e) =>
              setCurrentItem((prev) => ({
                ...prev,
                quantity: Math.max(1, parseInt(e.target.value)),
              }))
            }
            margin="normal"
            variant="outlined"
          />
          <Grid2 container justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <Button onClick={handleCloseModal} sx={{ marginRight: 1 }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={modalMode === "add" ? handleAddItem : handleEditItem}
            >
              {modalMode === "add" ? "Agregar" : "Guardar"}
            </Button>
          </Grid2>
        </Box>
      </Modal>
    </Paper>
  );
};
