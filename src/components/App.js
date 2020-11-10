import React from "react";
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
                <Route exact={true} path="/" component={Main} />
                <Route exact={true} path="/login" component={LoginContainer} />
                <Route exact={true} path="/join" component={JoinContainer} />
                <Route exact={true} path="/shareboard" component={ShareBoard} />
                <Route exact={true} path="/setprofile" component={SetProfile} />
                <Route exact={true} path="/memo" component={Memo} />
                <Route path="*" component={NotFound} />
            </Switch>
        </HashRouter>
    );
};

export default App;
