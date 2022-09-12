import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Users as UsersIcon,
  Layout as PagesIcon,
  Book as BlogsIcon,
  Calendar as BookingIcon,
  Briefcase as LedgerIcon,
  Square as FamilyIcon,
  MinusSquare as SubfamilyIcon,
  List as MenuItemIcon,
  ShoppingBag as Product,
  Star as ReviewIcon,
  Mail as EmailIcon,
  Bookmark as FeaturedIcon,
  Send as ContactIcon,
} from 'react-feather';
import NavItem from './NavItem';
import InputIcon from '@material-ui/icons/Input';

import userService from '../../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { getImageUrl, isLoggedIn } from '../../../utils/helper';
import Navigation from '../../../components/Navigation';
import adminService from '../../../services/adminService';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const serviceData = useSelector((state) => state.admin.services);
  const categoryData = useSelector((stage) => stage.admin.categories);

  // if (serviceData && serviceData.length > 0) {
  //   for (let i = 0; i < serviceData.length; i++) {
  //     setServices([
  //       ...services,
  //       {
  //         href: '/' + serviceData.slug,
  //         title: serviceData.name,
  //       },
  //     ]);
  //   }
  // }

  useEffect(() => {
    async function getServices() {
      try {
        // adminService.getService(dispatch);
      } catch (error) {
        console.error(error);
      }
    }
    getServices();
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        // adminService.getCategory(dispatch);
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();
  }, []);

  const items = [
    {
      title: 'Main',
      pages: [
        {
          href: '/dashboard',
          icon: BarChartIcon,
          title: 'Dashboard',
        },
        // {
        //   href: '/users',
        //   icon: UsersIcon,
        //   title: 'Users',
        // },
        {
          href: '/users',
          title: 'Users',
          icon: UsersIcon,
          children: [
            {
              href: '/users',
              icon: UsersIcon,
              title: 'All',
            },
            {
              href: '/users/superadmin',
              icon: UsersIcon,
              title: 'Super Admin',
            },
            {
              href: '/users/admin',
              icon: UsersIcon,
              title: 'Admin',
            },
            {
              href: '/users/member',
              icon: UsersIcon,
              title: 'Member',
            },
            {
              href: '/users/registered',
              icon: UsersIcon,
              title: 'Registered',
            },
            {
              href: '/users/guest',
              icon: UsersIcon,
              title: 'Guest',
            },
          ],
        },
        {
          href: '/site-setting',
          icon: SettingsIcon,
          title: 'Site Setting',
        },
        {
          href: '/banner',
          icon: SettingsIcon,
          title: 'Banner',
        },
        {
          href: '/testimonial',
          icon: SettingsIcon,
          title: 'Testimonial',
        },
        {
          href: '/bloom',
          icon: SettingsIcon,
          title: 'Bloom',
        },
        {
          href: '/introduction',
          icon: BarChartIcon,
          title: 'Introduction',
        },
        {
          href: '/service',
          icon: LedgerIcon,
          title: 'Service',
        },
        {
          icon: FamilyIcon,
          title: 'Category',
          children:
            serviceData && serviceData.length > 0
              ? serviceData.map((service) => {
                  return {
                    href: '/category/service/' + service.slug + '/list',
                    title: service.name,
                  };
                })
              : [],
        },
        {
          href: '/subscription',
          icon: SubfamilyIcon,
          title: 'Subscription',
        },
        {
          icon: Product,
          title: 'Product',
          children:
            categoryData && categoryData.length > 0
              ? categoryData.map((category) => {
                  return {
                    href: '/product/category/' + category.slug + '/list',
                    title: category.name,
                  };
                })
              : [],
        },
        {
          href: '/membership',
          icon: UsersIcon,
          title: 'Membership',
        },
        // {
        //   href: '/about',
        //   icon: UsersIcon,
        //   title: 'About Us',
        // },
        // {
        //   href: '/service-page',
        //   icon: UsersIcon,
        //   title: 'Service Page',
        // },
        // {
        //   href: '/account',
        //   icon: UserIcon,
        //   title: 'Account',
        // },
        {
          href: '/orders',
          icon: Product,
          title: 'Orders',
          children: [
            {
              href: '/orders',
              icon: Product,
              title: 'Orders',
            },
            {
              href: '/orders/in-transit',
              icon: Product,
              title: 'Processing',
            },
            {
              href: '/orders/completed',
              icon: Product,
              title: 'Completed',
            },
            {
              href: '/orders/cancelled',
              icon: Product,
              title: 'Cancelled',
            },
          ],
        },
        {
          href: '/contact-us',
          icon: UserIcon,
          title: 'Contact US',
        },
        {
          href: '/user-membership',
          icon: UserIcon,
          title: 'User Membership',
        },
        {
          href: '/user-subscription',
          icon: SubfamilyIcon,
          title: 'User Subscription',
        },
        // {
        //   href: '/settings',
        //   icon: SettingsIcon,
        //   title: 'Settings',
        // },
      ],
    },
  ];

  useEffect(() => {
    async function getUser() {
      try {
        await userService.profile(dispatch);
      } catch (error) {
        console.error(error);
      }
    }
    if (isLoggedIn()) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={getImageUrl(user.avatar)}
          to="/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.role}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        {/* <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List> */}
        <nav>
          {items.map((list) => (
            <Navigation
              component="div"
              key={list.title}
              pages={list.pages}
              title={list.title}
            />
          ))}
        </nav>
      </Box>
      <Box flexGrow={1} />
      <Hidden lgUp>
        <Box p={2}>
          <List
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              userService.logout(dispatch);
            }}
          >
            <NavItem href="/logout" title="Logout" icon={InputIcon} />
          </List>
        </Box>
      </Hidden>
    </Box>
  );

  return (
    <div>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </div>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
