import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { v4 as uuidv4 } from "uuid";
import { Button, IconButton, Menu, TextField } from "@mui/material";
import { Add, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { CListCard } from "../CListCard";

export const CDynamicTabs = () => {
  const [selectedTab, setSelectedTab] = useState();
  const [tabs, setTabs] = useState([
    {
      value: uuidv4(),
      label: "Lista 1",
      color: "#000",
      itemlist: [{ name: "Tomate", quantity: 23, isComplete: false }],
    },
    {
      value: uuidv4(),
      label: "Lista 2",
      color: "#000",
      itemlist: [{ name: "Zanangoria", quantity: 23, isComplete: false }],
    },
    {
      value: uuidv4(),
      label: "Lista 3",
      color: "#000",
      itemlist: [{ name: "Limon", quantity: 23, isComplete: false }],
    },
    {
      value: uuidv4(),
      label: "Lista 4",
      color: "#000",
      itemlist: [{ name: "lechuga", quantity: 23, isComplete: false }],
    },
  ]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleNameChange = (e) => {};

  const createNewTab = () => {
    const newValue = uuidv4();
    setTabs((prev) => [
      ...prev,
      {
        value: newValue,
        label: "Lista " + (prev.length + 1),
        itemlist: [{ name: "Tomate", quantity: 23, isComplete: false }],
      },
    ]);
    setSelectedTab(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <TabList variant="scrollable" onChange={handleChange}>
            {tabs.map((x) => (
              <Tab
                label={x.label}
                value={x.value}
                iconPosition="end"
                icon={
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVert />
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
          <CListCard selectedTab={tabs.find((x) => x.value === selectedTab)} />
        )}
      </TabContext>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              padding: 10,
            },
          },
        }}
      >
        <TextField variant="standard" onChange={handleNameChange} />
      </Menu>
    </Box>
  );
};
