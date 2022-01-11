import React from "react";
import {
  Divider,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router";
import _ from "lodash";
import { useThemeCreator } from "../../context/themeCreator";

const DialogText = ({ children }) => {
  return (
    <DialogContentText sx={{ fontWeight: 450 }}>{children}</DialogContentText>
  );
};

const generateUUID = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

let BottomControls = ({
  theme,
  saveOpen,
  setSaveOpen,
  isEditting,
  baseThemeId,
  setGlobalTheme,
}) => {
  const navigate = useNavigate();
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [themeName, setThemeName] = React.useState(theme.name);

  React.useEffect(() => {
    setThemeName(theme.name);
  }, [theme.name]);

  const cancel = () => navigate("/theme");
  const handleCancelClose = () => setCancelOpen(false);
  const handleSaveClose = () => setSaveOpen(false);

  const createTheme = () => {
    // replace this with an API call later.
    const newTheme = _.cloneDeep(theme);
    newTheme.name = themeName;
    newTheme.id = generateUUID();
    newTheme.base = baseThemeId;
    if (newTheme.isDefault) {
      newTheme.isDefault = false;
    }
    const themes = JSON.parse(localStorage.getItem("themes")) || [];
    themes.push(newTheme);
    localStorage.setItem("themes", JSON.stringify(themes));
  };

  const editTheme = () => {
    // also replace this with an API call
    const themes = JSON.parse(localStorage.getItem("themes"));
    const newTheme = _.cloneDeep(theme);
    newTheme.name = themeName;
    const newThemes = themes.map((mapTheme) =>
      mapTheme.id === theme.id ? newTheme : mapTheme
    );
    localStorage.setItem("themes", JSON.stringify(newThemes));
    setGlobalTheme((t) => (t.id === newTheme.id ? newTheme : t));
  };

  const handleAction = () => {
    handleSaveClose();
    cancel();
  };

  const handleSave = () => {
    createTheme();
    handleAction();
  };

  const handleEdit = () => {
    editTheme();
    handleAction();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleSave();
  };

  return (
    <>
      <Divider sx={{ mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => setCancelOpen(true)}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={() => setSaveOpen(true)}>
          {isEditting ? "Save" : "Create"}
        </Button>
      </Box>
      <Dialog open={cancelOpen} onClose={handleCancelClose}>
        <DialogTitle>Are you sure you want to cancel?</DialogTitle>
        <DialogContent>
          <DialogText>
            Any changes you have made will be permanently discarded.
          </DialogText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} autoFocus>
            No
          </Button>
          <Button
            onClick={() => {
              handleCancelClose();
              cancel();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={saveOpen} onClose={handleSaveClose}>
        <DialogTitle>Create theme</DialogTitle>
        <DialogContent>
          <DialogText>Enter your theme's name</DialogText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveClose}>Cancel</Button>
          <Button onClick={isEditting ? handleEdit : handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const areEqual = (prevProps, nextProps) =>
  nextProps.tab !== "base" &&
  nextProps.saveOpen === prevProps.saveOpen &&
  nextProps.saveOpen !== true;

BottomControls = React.memo(BottomControls, areEqual);

const Wrapper = ({ tab, isEditting, baseThemeId, setGlobalTheme }) => {
  const [theme] = useThemeCreator();
  const [saveOpen, setSaveOpen] = React.useState(false);

  return (
    <BottomControls
      theme={theme}
      saveOpen={saveOpen}
      setSaveOpen={setSaveOpen}
      tab={tab}
      isEditting={isEditting}
      baseThemeId={baseThemeId}
      setGlobalTheme={setGlobalTheme}
    />
  );
};

export default Wrapper;
