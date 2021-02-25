import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";


const theme = createMuiTheme({
    palette: {
    type: "dark",
  },
  
});

const store= createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
    <App />
    </Provider>
    
    </ThemeProvider>,
    document.querySelector('#root')
);