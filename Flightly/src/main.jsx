import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import { store } from './redux/store';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <ToastContainer />
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
)
