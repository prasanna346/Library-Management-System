import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LibraryManagementSystem from "./LibraryManagementSystem";
import Update from "./update";
import Delete from "./delete";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LibraryManagementSystem />} />
        <Route path="/lms" element={<LibraryManagementSystem />} />
        <Route path="/library-management-system" element={<LibraryManagementSystem />} />
        <Route path="/log" element={<LibraryManagementSystem />} />
        <Route path="/login" element={<LibraryManagementSystem />} />
        <Route path="/update" element={<Update />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;