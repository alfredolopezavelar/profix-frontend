import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import Router from "./routes/Router";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Router />
      </Box>
    </Box>
  );
}

export default App;
