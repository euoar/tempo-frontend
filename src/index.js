import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/index.css';
import './styles/css/weather-icons.min.css';
import './styles/css/weather-icons-wind.min.css';
import './index.css';

import { createStore, applyMiddleware } from "redux";
import rootReducer from "./app/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25 });

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));