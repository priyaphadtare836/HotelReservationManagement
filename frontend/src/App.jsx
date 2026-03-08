import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ReservationDetailPage from "./pages/ReservationDetailPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/reservation/:id" element={<ReservationDetailPage />} />
      </Routes>
    </div>
  );
};
export default App;