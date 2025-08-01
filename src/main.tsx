import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { ThemeProvider } from '@/components/common/theme-provider';

import '@/styles/index.css';

import Docs from '@/app/docs';
import { Loading } from './components/common/ui/loading';

const Home = lazy(() => import('@/app/home'));

const router = createBrowserRouter([
  {
    path: '/docs/*',
    element: <Docs />,
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading size="screen" />}>
        <Home />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
const currentRoute = window.location.href.split('?currentRoute=')[1];
if (currentRoute) {
  router.navigate(currentRoute);
}
