import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import StudentPage from "./student/pages/StudentPage";
import { ShowStudent } from "./student/pages/ShowStudent";
import { Page404 } from "./pages/Page404";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route index element={<StudentPage />} />
          <Route path="/:id" element={<ShowStudent />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
