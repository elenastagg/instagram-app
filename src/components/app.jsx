import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogIn from './login';
import Register from './register';
import Profile from './profile';
import Upload from './upload';
import NavBar from './navbar';
import Feed from './feed';
import Bio from './bio';
import TokenManager from '../utils/token-manager';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: TokenManager.isTokenValid() ? TokenManager.getTokenPayLoad() : null,
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  handleLogin = () => {
    this.setState({ user: TokenManager.getTokenPayLoad() });
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({
      user: null,
    });
    const { history } = this.props;
    history.push('/');
  };

  isLoggedIn = () => {
    const { user } = this.state;

    return Boolean(user) && TokenManager.isTokenValid();
  };

  checkAuth = () => {
    const { history, location } = this.props;
    if (location.pathname !== '/register' && location.pathname !== '/' && !this.isLoggedIn()) {
      history.push('/');
    }
  };

  render() {
    return (
      <Fragment>
        <NavBar isLoggedIn={this.isLoggedIn()} onLogout={this.handleLogout} />
        <Switch>
          <Route
            exact
            path="/"
            render={routerProps => <LogIn {...routerProps} onLogin={this.handleLogin} />}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile/me" component={Profile} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/bio" component={Bio} />
          <Route exact isLoggedIn={this.isLoggedIn()} path="/upload" component={Upload} />
        </Switch>
      </Fragment>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(App);
