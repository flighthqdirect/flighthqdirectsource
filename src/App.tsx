import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Airlines from "./pages/Airlines";
import AirlineDetail from "./pages/AirlineDetail";
import Airports from "./pages/Airports";
import AirportDetail from "./pages/AirportDetail";
import RoutesPage from "./pages/Routes";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import Deals from "./pages/Deals";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Home />} />
          <Route path="/airlines" element={<Airlines />} />
          <Route path="/airlines/:id" element={<AirlineDetail />} />
          <Route path="/airports" element={<Airports />} />
          <Route path="/airports/:id" element={<AirportDetail />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/lp/:slug" element={<LandingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
