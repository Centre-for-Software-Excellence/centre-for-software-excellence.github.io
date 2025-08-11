import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { ThemeProvider } from '@/components/common/theme-provider';

import '@/styles/index.css';

import Docs from '@/app/docs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/docs/blog" replace />,
  },
  {
    path: '/docs/blog/*',
    element: <Docs />,
  },
  {
    path: '*',
    element: <Navigate to="/docs/blog" replace />,
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
