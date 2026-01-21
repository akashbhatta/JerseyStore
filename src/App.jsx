import { useState } from "react";
import AppRouter from "./Router/AppRouter";
import Navbar from "./Components/Navbar";
import Footer from "./Pages/Footer";
import Scroll from "./Components/Scroll";

function App() {
  // ✅ define shared state here
  const [searchText, setSearchText] = useState("");
  console.log("App State - searchText:", searchText);
  const [filterCategory, setFilterCategory] = useState("");

  return (
    <div className="gradient-bg scroll-smooth">
      {/* pass setters to Navbar */}
      <Navbar
        setSearchText={setSearchText}
        setFilterCategory={setFilterCategory}
      />

      <Scroll />

      {/* pass current values to router/pages */}
      <AppRouter
        searchText={searchText}
        filterCategory={filterCategory}
    />

      <Footer />
    </div>
  );
}

export default App;
