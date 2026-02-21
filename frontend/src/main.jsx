import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        {/* <LoaderProvider> */}
          <ToastProvider>
            <AuthProvider>
              <ThemeProvider>
                <App/>
              </ThemeProvider>
            </AuthProvider>
          </ToastProvider>
        {/* </LoaderProvider> */}
    </BrowserRouter>
  </StrictMode>,
)
