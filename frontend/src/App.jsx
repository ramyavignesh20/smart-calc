import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BmiCalculator, MathCalculator, TrigonometryCalculator, InterestCalculator, DiscountCalculator, RootCalculator, LandCalculator, LengthCalculator, AreaCalculator } from "./pages/CalculatorPages";

export default function App() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <LanguageProvider>
      <div className={isAuthenticated ? "app-shell app-shell-authenticated" : "app-shell"}>
        {isAuthenticated && <Navbar />}
        <div className="app-main-content">
          <main className="app-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/settings" element={<Navigate to="/dashboard" replace />} />
              <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/calculator/bmi" element={<ProtectedRoute><BmiCalculator /></ProtectedRoute>} />
              <Route path="/calculator/math" element={<ProtectedRoute><MathCalculator /></ProtectedRoute>} />
              <Route path="/calculator/trigonometry" element={<ProtectedRoute><TrigonometryCalculator /></ProtectedRoute>} />
              <Route path="/calculator/interest" element={<ProtectedRoute><InterestCalculator /></ProtectedRoute>} />
              <Route path="/calculator/discount" element={<ProtectedRoute><DiscountCalculator /></ProtectedRoute>} />
              <Route path="/calculator/root" element={<ProtectedRoute><RootCalculator /></ProtectedRoute>} />
              <Route path="/calculator/land" element={<ProtectedRoute><LandCalculator /></ProtectedRoute>} />
              <Route path="/calculator/length" element={<ProtectedRoute><LengthCalculator /></ProtectedRoute>} />
              <Route path="/calculator/area" element={<ProtectedRoute><AreaCalculator /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}
