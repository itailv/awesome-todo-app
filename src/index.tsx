import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import store from './store';
import App from "./containers/App";
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);