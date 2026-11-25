import { useEffect } from 'react';
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import { AppLayout } from './components/AppLayout.jsx';
import { Home } from './pages/Home.jsx';
import { Browse } from './pages/BrowseSchemes.jsx';
import { Finder } from './pages/SchemeFinder.jsx';
import { Results } from './pages/SchemeResults.jsx';
import { Details } from './pages/SchemeDetails.jsx';
import { Compare } from './pages/SchemeCompare.jsx';
import { About } from './pages/About.jsx';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<Finder />} />
        <Route path="/results" element={<Results />} />
        <Route path="/schemes" element={<Browse />} />
        <Route path="/schemes/:id" element={<Details />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
        <Route
          path="*"
          element={
            <div className="page container">
              <h1>Page not found</h1>
              <Link to="/">Return home</Link>
            </div>
          }
        />
      </Routes>
    </AppLayout>
  );
}
