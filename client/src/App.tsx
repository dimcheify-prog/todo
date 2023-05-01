import React from 'react';
import {Routes, Route} from "react-router-dom";
import "./App.sass";
import TasksPage from "./pages/TasksPage/TasksPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  return (
      <Routes>
          <Route index path="/login" element={<LoginPage/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
          <Route path="/tasks" element={<TasksPage/>}/>
          <Route path="*" element={<div>Not Found</div>}/>
      </Routes>
  );
}

export default App;
