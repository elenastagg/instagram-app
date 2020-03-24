import React from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';

const NavBar = ({ isLoggedIn, onLogout }) => (
  <nav style={{ backgroundColor: 'lightgrey', padding: 10 }}>
    {isLoggedIn && (
      <div>
        <button type="submit" onClick={onLogout}>
          Log out
        </button>
      </div>
    )}
  </nav>
);

NavBar.propTypes = {
  // user: PropTypes.shape({
  //   firstName: PropTypes.string,
  //   lastName: PropTypes.string,
  // }),
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
  },
};

export default NavBar;
