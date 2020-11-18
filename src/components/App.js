import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import NotFound from "./Error/NotFound";
import JoinContainer from "../containers/AuthContainer/JoinContainer";
import LoginContainer from "../containers/AuthContainer/LoginContainer";
import ShareBoard from "../components/Main/ShareBoard";
import SetProfile from "../components/Main/SetProfile";
import MemoContainer from "../containers/MemoContainer";
import ProfileContainer from "../containers/ProfileContainer";
import UpdatePost from "./Main/UpdatePost";
import RankingContainer from "../containers/RankingContainer";
import Memo from "./Main/Memo";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={ShareBoard} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/join" component={JoinContainer} />
        <Route exact path="/setprofile" component={SetProfile} />
        <Route exact path="/updatepost" component={UpdatePost} />
        <Route exact path="/memo" component={MemoContainer} />
        <Route exact path="/ranking" component={RankingContainer} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
