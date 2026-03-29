import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Airlines from "./pages/Airlines";
import AirlineDetail from "./pages/AirlineDetail";
import Airports from "./pages/Airports";
import AirportDetail from "./pages/AirportDetail";
import RoutesPage from "./pages/Routes";
import RouteDetail from "./pages/RouteDetail";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { NotificationProvider } from "./context/NotificationContext";

export default function App() {
  return (
    <NotificationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/flights" element={<Home />} />
            <Route path="/airlines" element={<Airlines />} />
            <Route path="/airlines/:id" element={<AirlineDetail />} />
            <Route path="/airports" element={<Airports />} />
            <Route path="/airports/:id" element={<AirportDetail />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/routes/:id" element={<RouteDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/lp/:slug" element={<LandingPage />} />
          </Routes>
        </Layout>
      </Router>
    </NotificationProvider>
  );
}
