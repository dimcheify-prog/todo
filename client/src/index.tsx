import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.sass";
import {BrowserRouter as Router} from "react-router-dom";
import AppStore from "./store/store";
import {injectStores} from "@mobx-devtools/tools";

interface IStore {
        store: AppStore;
}

const store = new AppStore();

injectStores({
        store,
});

export const AppContext = createContext<IStore>({
        store,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <AppContext.Provider value={{store}}>
            <Router>
                    <App />
            </Router>
    </AppContext.Provider>
);
