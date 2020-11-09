import React, { useState } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import NotFound from "./Error/NotFound";
import JoinContainer from "../containers/AuthContainer/JoinContainer";
import LoginContainer from "../containers/AuthContainer/LoginContainer";
import Main from "../components/Main/Main";
import ShareBoard from "../components/Main/ShareBoard";
import SetProfile from "../components/Main/SetProfile";
import Memo from "../components/Main/Memo";

const App = () => {
    return (
        <HashRouter>
            <GlobalStyle />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/join" component={JoinContainer} />
                <Route exact path="/shareboard" component={ShareBoard} />
                <Route exact path="/setprofile" component={SetProfile} />
                <Route exact path="/memo" component={Memo} />
                <Route path="*" component={NotFound} />
            </Switch>
        </HashRouter>
    );
};

export default App;
