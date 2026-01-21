import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/HomePage";
import Home from "../Pages/Home";
import ClubDetail from "../Pages/ClubDetail";
import CartDisplay from "../Pages/CartDisplay";
import AboutSection from "../Pages/About";
import Contact from "../Pages/Contact";

const AppRouter = ({ searchText, filterCategory }) => {
  return (
    <Routes>
      {/* Landing page */}
      <Route
        path="/"
        element={<Homepage searchQuery={searchText} />}
      />

      {/* Main product listing */}
      <Route
        path="/home"
        element={
          <Home
            searchQuery={searchText}
            filterCategory={filterCategory}
          />
        }
      />

      <Route
        path="/category/:type"
        element={
          <Home
            searchQuery={searchText}
            filterCategory={filterCategory}
          />
        }
      />

      {/* Static pages */}
      <Route path="/cart" element={<CartDisplay />} />
      <Route path="/about" element={<AboutSection />} />
      <Route path="/contact" element={<Contact />} />

      {/* Jersey detail */}
      <Route path="/club/:clubId" element={<ClubDetail />} />
    </Routes>
  );
};

export default AppRouter;
