import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "../context/theme";
import { AppDrawerProvider } from "../context/appDrawer";
import GlobalStyle from "../styles/global";

const AppWrapper = ({ children }) => {
  return (
    <>
      <ThemeProvider>
        <GlobalStyles styles={GlobalStyle} enableColorScheme />
        <CssBaseline />
        <AppDrawerProvider>{children}</AppDrawerProvider>
      </ThemeProvider>
    </>
  );
};

export default AppWrapper;
