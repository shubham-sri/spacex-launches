import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export const AppRoute: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={'/'}>
                    <div>
                        <h1>Home</h1>
                    </div>
                </Route>
                <Route exact path={'/compare/a/:idA/b/:idb'}>
                    <div>
                        <h1>Compare</h1>
                    </div>
                </Route>
                <Route>
                    <Redirect to={'/'}/>
                </Route>
            </Switch>
        </Router>
    )
}
