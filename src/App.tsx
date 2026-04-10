import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-100">
        <Navbar />

        <main className="container mx-auto p-4">
          <Outlet />
        </main>

        <Footer/>
      </div>
    </>
  );
}

export default App;
