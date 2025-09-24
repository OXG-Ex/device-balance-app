import "bootstrap/dist/css/bootstrap.min.css";
import {ThemeProvider} from "react-bootstrap";
import {DevicesPage} from "./pages/ui/DevicesPage";

function App() {
  return (
    <>
      <ThemeProvider>
        <DevicesPage />
      </ThemeProvider>
      ;
    </>
  );
}

export default App;
