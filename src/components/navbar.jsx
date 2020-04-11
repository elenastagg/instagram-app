import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TokenManager from '../utils/token-manager';

const NavBar = ({ isLoggedIn, onLogout }) => (
  <nav style={{ backgroundColor: 'lightgrey', padding: 10 }}>
    {isLoggedIn && (
      <div>
        <button type="button" onClick={onLogout}>
          Log out
        </button>
      </div>
    )}
    <div>
      <button type="button">
        <Link to="/feed">Feed</Link>
      </button>
    </div>
    <div>
      <button type="button">
        <Link to={`/profile/${TokenManager.getTokenPayLoad()._id}`}>My Profile</Link>
      </button>
    </div>
  </nav>
);

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default NavBar;
