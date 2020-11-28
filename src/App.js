import "react-perfect-scrollbar/dist/css/styles.css";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/utils/GlobalStyles";
import theme from "src/theme";
import routes from "src/routes";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>{routing}</Provider>
    </ThemeProvider>
  );
};

export default App;
