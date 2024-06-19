import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Themeroutes from './routes/Router';
import ThemeSelector from './layouts/theme/ThemeSelector';
import Loader from './layouts/loader/Loader';

const App = () => {
  const routing = useRoutes(Themeroutes);
  const direction = useSelector((state) => state.customizer.isRTL);
  const isMode = useSelector((state) => state.customizer.isDark);
  return (
    <Router basename="/citt-pass-crm-front-end"> {/* Ajusta el basename */}
      <Suspense fallback={<Loader />}>
        <div
          className={`${direction ? 'rtl' : 'ltr'} ${isMode ? 'dark' : ''}`}
          dir={direction ? 'rtl' : 'ltr'}
        >
          <ThemeSelector />
          {routing}
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
