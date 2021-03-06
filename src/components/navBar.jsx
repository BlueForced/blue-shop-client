import {
  AppBar as AppBarComp,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDrawer } from "../context/appDrawer";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Offers", link: "/offers" },
  { name: "Customer\u00A0Support", link: "/support" },
  { name: "Gift\u00A0Cards", link: "/gifts" },
  { name: "Sell", link: "/sell" },
];

const AppBar = () => {
  const [, setDrawerOn] = useAppDrawer();
  return (
    <AppBarComp
      position="static"
      sx={{
        mb: 1,
        backgroundColor: (theme) => theme.palette.background.navBar,
      }}
      component="nav"
    >
      <Toolbar variant="dense">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, color: (theme) => theme.palette.text.navButton }}
          onClick={() => setDrawerOn(true)}
        >
          <MenuIcon />
        </IconButton>
        {navItems.map((item) => (
          <Button
            variant="text"
            component={Link}
            to={item.link}
            sx={{
              color: (theme) => theme.palette.text.navButton,
            }}
            key={item.name}
          >
            {item.name}
          </Button>
        ))}
      </Toolbar>
    </AppBarComp>
  );
};

export default AppBar;
