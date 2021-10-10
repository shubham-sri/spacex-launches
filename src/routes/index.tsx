import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {CompareScreen, HomeScreen} from "../screens";

export const AppRoute: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={'/'}>
                    <HomeScreen/>
                </Route>
                <Route exact path={'/compare/a/:idA/b/:idB'}>
                    <CompareScreen/>
                </Route>
                <Route>
                    <Redirect to={'/'}/>
                </Route>
            </Switch>
        </Router>
    )
}
