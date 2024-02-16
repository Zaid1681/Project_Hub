import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// import PersistProvider from './Redux/providers/persist-provider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Router> */}
    <Provider store={store}>
      {/* <PersistProvider> */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      {/* </PersistProvider> */}
    </Provider>
    {/* </Router> */}
  </React.StrictMode>
);
