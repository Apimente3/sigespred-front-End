import React, {Component} from 'react';
import './App.css'
import '../src/styles/css/endless.css'
import '../src/styles/css/endless-skin.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'
import Page404 from './components/pages/404';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


// Redux
import {Provider} from 'react-redux';
import store from './store/index';
import Routes from "./routes";


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={true}
                    preventDuplicates
                    position="top-center"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                    closeOnToastrClick>
                </ReduxToastr>
                <Router>
                    <React.Fragment>
                        <Switch>
                            {Routes.map((route, i) =>
                                (<Route key={i} exact {...route}/>)
                            )}
                        </Switch>
                    </React.Fragment>
                </Router>
            </Provider>
        );
    }
}

export default App;
