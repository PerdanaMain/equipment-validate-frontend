import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/login/Login";
import Reg from "./pages/register/Register";
import Dash from "./pages/dashboard/Dashboard";
import Equipment from "./pages/equipments/Equipment";
import Add from "./pages/equipments/add/Add";
import Edit from "./pages/equipments/update/Update";
import NotFound from "./pages/404/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="reg" element={<Reg />} />
          <Route path="dashboard" element={<Dash />} />
          <Route path="404" element={<NotFound />} />
          <Route path="/Equipment">
            <Route index element={<Equipment />}></Route>
            <Route path="add" element={<Add />}></Route>
            <Route path="update/:id" element={<Edit />}></Route>
          </Route>
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
