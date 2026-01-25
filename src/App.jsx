import { useState } from "react";
import AppRouter from "./Router/AppRouter";
import Navbar from "./Components/Navbar";
import Footer from "./Pages/Footer";
import Scroll from "./Components/Scroll";

function App() {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  return (
    <div className="min-h-screen flex flex-col gradient-bg scroll-smooth">
      <Navbar
        setSearchText={setSearchText}
        setFilterCategory={setFilterCategory}
      />

      <Scroll />

      {/* Main content grows to fill space, pushing footer down */}
      <main className="flex-1">
        <AppRouter
          searchText={searchText}
          filterCategory={filterCategory}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
