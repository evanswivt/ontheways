import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core';
import Logo from '../../components/Logo';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { isLoggedIn } from '../../utils/helper';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
  },
  logo: {
    flexGrow: 1,
  },
});

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPath = location ? location.pathname === '/login' : '';

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/" className={classes.logo}>
          <Logo />
        </RouterLink>
        {!(isLoginPath || isLoggedIn()) && (
          <Button
            color="inherit"
            onClick={() => {
              navigate('/login');
            }}
            endIcon={<ExitToApp />}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
