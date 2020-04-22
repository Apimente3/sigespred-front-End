import React, { Component } from 'react';
import Header from './componentes/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// Redux
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <React.Fragment>
                        <Header />
                    </React.Fragment>
                </Router>
            </Provider>
        );
    }
}

export default App;
