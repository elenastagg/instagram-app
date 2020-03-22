import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogIn from './login';
import Register from './register';
import Profile from './profile';
import Upload from './upload';
import TokenManager from '../utils/token-manager';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: TokenManager.isTokenValid() ? TokenManager.getTokenPayLoad() : null,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const user = TokenManager.getTokenPayLoad();

    this.setState({ user });
  }

  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={routerProps => <LogIn {...routerProps} onLogin={this.handleLogin} />}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/upload" component={Upload} />
        </Switch>
      </>
    );
  }
}

export default App;
