import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Avatar,
  ListItemIcon,
  Tooltip,
  Modal,
  Backdrop
} from '@mui/material';

import {
  Login,
  Search,
  ShoppingCartOutlined ,
  ShoppingCart,
  Logout,
  Person
} from '@mui/icons-material';

import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import Profile from "./Profile";
import { useSnackbar } from 'notistack';

const CLIENTID = "1042323156437-h0qe843489vh5lgh3g9696mucd728dqa.apps.googleusercontent.com";

const SearchI = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(5),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    marginLeft : 0,
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [openProf, setProf] = React.useState(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setProf(true);
    setAnchorEl(null);
  }

  const responseGoogle = async (response) => {
    if(response.error === 'popup_closed_by_user' ){ setUser(null);enqueueSnackbar("Pop Up Closed by user!!!", { variant:"error" });}
    else{ setUser(response);enqueueSnackbar('Login Successfull!!!', { variant:"success" });}
  }

  const { signIn } = useGoogleLogin({
      onSuccess : responseGoogle,
      clientId : CLIENTID,
      cookiePolicy : 'single_host_origin',
      isSignedIn : true,
      onFailure : responseGoogle,
  })

  const { signOut } = useGoogleLogout({
    onFailure : (res) => console.log(res),
    clientId : CLIENTID,
    cookiePolicy : 'single_host_origin',
    onLogoutSuccess : (res) => {setUser(null);enqueueSnackbar('LogOut Successfull!!!', { variant:"success" });}
  })

  const handleSignIn = (event) => {
    if(!user){
      signIn();
    }else{
      setAnchorEl(event.currentTarget);
    }
  }

  const handleSignOut = (event) => {
    if(user){
      signOut();
      setAnchorEl(null);
    }
  }

  const renderMenu = (
    <Menu
        id={"menuId"}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleSignOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor : "#993399"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            >
            <ShoppingCart/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, fontFamily: 'McLaren, cursive'}}
            >
            e-Commerce Project
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SearchI>
            <SearchIconWrapper>
              <Search/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Looking for books? 👀"
              inputProps={{ 'aria-label': 'search'}}
              sx={{fontFamily: 'McLaren, cursive'}}
            />
          </SearchI>
          <Box>
            <IconButton
              size="large"
              color="inherit"
              >
              <Badge color="error">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={"menuId"}
              aria-haspopup="true"
              onClick={handleSignIn}
              color="inherit"
            >
            {user!==null && !Array.isArray(user) && typeof user === 'object'?
            <Tooltip title="Account Details">
              <Avatar alt={user.profileObj.name} src={user.profileObj.imageUrl} sx={{ width: 28, height: 28 }} />
            </Tooltip>
            :<Tooltip title="Google Login"><Login/></Tooltip>}
            </IconButton>
          </Box>
        </Toolbar>
        <Modal
          className={classes.modal}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openProf}
          onClose={()=>setProf(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          >
            <div className={classes.paper}>
              <Profile user={user}/>
            </div>
        </Modal>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        border: '2px solid #000',
    },
}));
