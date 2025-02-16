import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PropertyContextProvider } from './context/PropertyContext.jsx'
import "./media.css"
import ModalContextProvider from './context/ModalContext.jsx'
import SideBarContextProvider from './context/SideBarContext.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'
import { StripeProvider } from './components/payments/StripeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ModalContextProvider>
            <SideBarContextProvider>
                <PropertyContextProvider>
                    <Provider store={store}>
                        <StripeProvider>
                            <App />
                        </StripeProvider>
                    </Provider>
                </PropertyContextProvider>
            </SideBarContextProvider>
        </ModalContextProvider>
    </BrowserRouter>
)
