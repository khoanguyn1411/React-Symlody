import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";

import { HomeContainer, LoginContainer } from "@/container";

import { CustomRoute } from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomRoute>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginContainer />} />
        </CustomRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;
