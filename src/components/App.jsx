import styles from './App.module.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PageContainer from './PageContainer/PageContainer';
import Loader from './Loader/Loader';

// import Home from 'pages/Home/Home';
// import MovieDetails from 'pages/MovieDetails/MovieDetails';
// import Cast from './Cast/Cast';
// import Reviews from './Reviews/Reviews';
// import Movies from 'pages/Movies/Movies';

const Home = lazy(() => import('pages/Home/Home'));
const Movies = lazy(() => import('pages/Movies/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <>
      <header>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.navLink}>
            Home
          </NavLink>
          <NavLink to="/movies" className={styles.navLink}>
            Movies
          </NavLink>
        </nav>
      </header>
      <main>
        <PageContainer>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:movieId" element={<MovieDetails />}>
                <Route path="cast" element={<Cast />} />
                <Route path="reviews" element={<Reviews />} />
              </Route>
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </PageContainer>
      </main>
    </>
  );
};
