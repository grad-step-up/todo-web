import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import Provider from "react-redux/es/components/Provider";
import {ToDoStore} from "./todo/store/ToDoStore";

const store = ToDoStore.create();
ReactDOM.render(<Provider store={store}><App/></Provider>,
    document.getElementById('root'));
registerServiceWorker();