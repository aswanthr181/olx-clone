import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseContext } from './store/firebaseContex.jsx'
import Context from './store/firebaseContex.jsx'
import { firebase, db } from './firebase/config.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, db }}>
      <Context>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
)
