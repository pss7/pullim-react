import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import SubPage from './pages/SubPage';
import Team from './pages/Team';
import Service from './pages/Service';
import Contact from './pages/Contact';
import News from './pages/News';
import NewsDeatil from './pages/NewsDetail';

function App() {

  return (
    <Routes>

      {/* 메인페이지 */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* 서브페이지 */}
      <Route element={<SubPage />}>

        {/* 소개페이지 */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* 팀페이지 */}
        <Route
          path="/team"
          element={<Team />}
        />

        {/* 서비스페이지 */}
        <Route
          path="/service"
          element={<Service />}
        />

        {/* 소식페이지 */}
        <Route
          path="/news"
          element={<News />}
        />

        {/* 소식페이지 */}
        <Route
          path="/news-detail"
          element={<NewsDeatil />}
        />


        {/* 문의페이지 */}
        <Route
          path="/contact"
          element={<Contact />}
        />

      </Route>

    </Routes>
  );

}

export default App;