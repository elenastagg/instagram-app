import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogIn from './login';
import Register from './register';
import Profile from './profile';
import Upload from './upload';
import NavBar from './navbar';
import TokenManager from '../utils/token-manager';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: TokenManager.isTokenValid() ? TokenManager.getTokenPayLoad() : null,
    };
  }

  componentDidMount() {
    const { history, location } = this.props;
    if (location.pathname !== '/register' && !this.isLoggedIn()) {
      history.push('/');
    }
  }

  handleLogin = () => {
    this.setState({ user: TokenManager.getTokenPayLoad() });
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({
      user: null,
    });
  };

  isLoggedIn = () => {
    const { user } = this.state;

    return Boolean(user) && TokenManager.isTokenValid();
  };

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <NavBar isLoggedIn={this.isLoggedIn()} user={user} onLogout={this.handleLogout} />
        <Switch>
          <Route
            exact
            path="/"
            render={routerProps => <LogIn {...routerProps} onLogin={this.handleLogin} />}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route
            exact
            isLoggedIn={this.isLoggedIn()}
            user={user}
            path="/upload"
            component={Upload}
          />
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
