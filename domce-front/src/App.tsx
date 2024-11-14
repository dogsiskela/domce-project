import { Route, Routes, BrowserRouter as Router, } from "react-router-dom";
import MapScreen from "./pages/MapScreen/MapScreen";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <APIProvider apiKey={import.meta.env.MAPS_API} onLoad={() => console.log('Maps API has loaded.')}>
            <MapScreen />
          </APIProvider>
        } />
      </Routes>
    </Router>
  );
}

export default App;