import { createTheme, MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import HouseAnalyzingProvider from "./context/HouseAnalyzingProvider";

const theme = createTheme({
  fontFamily: "Verdana, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Greycliff CF, sans-serif" },
});

function App() {
  return (
    <HouseAnalyzingProvider>
      <MantineProvider theme={theme}>
        <RouterProvider router={routes} />
      </MantineProvider>
    </HouseAnalyzingProvider>
  );
}

export default App;
