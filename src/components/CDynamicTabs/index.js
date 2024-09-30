import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { v4 as uuidv4 } from "uuid";
import { Button, IconButton, Menu, TextField, Typography } from "@mui/material";
import { Add, MoreVert, Delete } from "@mui/icons-material";
import { useState } from "react";
import { CListCard } from "../CListCard";
import { getContrastColor } from "../../utils";

export const CDynamicTabs = () => {
  const [selectedTab, setSelectedTab] = useState();
  const [tabToChange, setTabToChange] = useState();

  const [tabs, setTabs] = useState([]);

  const handleChange = (event, newValue) => setSelectedTab(newValue);

  const handleNameChange = (e) => {
    if (e?.target.value)
      setTabToChange((prev) => ({ ...prev, label: e.target.value }));
  };

  const handleColorChange = (e) => {
    if (e?.target.value)
      setTabToChange((prev) => ({ ...prev, color: e.target.value }));
  };

  const handleDeleteChange = () => {
    setTabs((prev) => prev.filter((x) => x.value !== tabToChange.value));
    setSelectedTab(null);

    handleClose();
  };

  const createNewTab = () => {
    const newValue = uuidv4();
    setTabs((prev) => [
      ...prev,
      {
        value: newValue,
        label: "Lista " + (prev.length + 1),
        itemlist: [],
      },
    ]);
    setSelectedTab(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, tab) => {
    setTabToChange(tab);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTabs((prev) =>
      prev.map((x) => (x.value === tabToChange.value ? tabToChange : x))
    );
    setTabToChange(null);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <TabList variant="scrollable" onChange={handleChange}>
            {tabs.map((x) => (
              <Tab
                key={x.value}
                label={x.label}
                value={x.value}
                style={{
                  backgroundColor: x.color,
                  color: getContrastColor(x.color),
                }}
                iconPosition="end"
                icon={
                  <IconButton onClick={(e) => handleClick(e, x)}>
                    <MoreVert htmlColor={getContrastColor(x.color)} />
                  </IconButton>
                }
              />
            ))}
          </TabList>
          <Button onClick={createNewTab} sx={{ marginLeft: "auto" }}>
            <Add />
          </Button>
        </Box>
        {selectedTab && (
          <CListCard
            selectedTab={tabs.find((x) => x.value === selectedTab)}
            setTabs={setTabs}
            tabs={tabs}
          />
        )}
      </TabContext>

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: { padding: 16, borderRadius: 8, width: 250 },
          },
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          label="Nombre"
          value={tabToChange?.label || ""}
          onChange={handleNameChange}
          sx={{ marginBottom: 2 }}
        />

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Typography variant="body2" sx={{ marginRight: 2 }}>
            Color:
          </Typography>
          <input
            type="color"
            value={tabToChange?.color || "#000000"}
            onChange={handleColorChange}
            style={{
              width: "50px",
              height: "36px",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          startIcon={<Delete />}
          color="error"
          onClick={handleDeleteChange}
        >
          Eliminar Lista
        </Button>
      </Menu>
    </Box>
  );
};
