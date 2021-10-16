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
  Backdrop,
  Popover,
  Slide,
  Dialog,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  Button,
  DialogActions,
  Grid
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  Login,
  Search,
  ShoppingCartOutlined ,
  ShoppingCart,
  Logout,
  Person,
  ExpandMore,
  Close,
  Edit,
  Save
} from '@mui/icons-material';

import { styled, alpha, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import UpdateProfile from "./Profile";
import { useSnackbar } from 'notistack';

const CLIENTID = "1042323156437-h0qe843489vh5lgh3g9696mucd728dqa.apps.googleusercontent.com";

const SearchI = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const PrimarySearchAppBar = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const matchem = useMediaQuery(theme.breakpoints.up('md'));
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [drawer, setDrawer] = React.useState(false);
  const [cart, setCart] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [openProf, setProf] = React.useState(false);
  const [openUpdateProf, setUpdateProf] = React.useState(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setProf(true);
    setAnchorEl(null);
    setDrawer(null);
  }

  const responseGoogle = async (response) => {
    console.log(response)
    if(response.error === 'popup_closed_by_user' ){ setUser(null);enqueueSnackbar("Pop Up Closed by user!!!", { variant:"error" });}
    else{ setUser(response);enqueueSnackbar('Login Successfull!!!', { variant:"success" });setDrawer(null);setAnchorEl(null);}
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
    onLogoutSuccess : (res) => {setUser(null);enqueueSnackbar('LogOut Successfull!!!', { variant:"success" });setDrawer(null);setAnchorEl(null);}
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
            fontFamily: 'McLaren, cursive',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      <MenuItem onClick={handleProfile} sx={{fontFamily: 'McLaren, cursive', }}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleSignOut} sx={{fontFamily: 'McLaren, cursive', }}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const renderItem = (
      <Box style={{paddingLeft:2, paddingRight:15, marginRight:0}}>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => setCart(true)}
          >
          <Tooltip title="Cart">
          <Badge color="error">
            <ShoppingCartOutlined />
          </Badge>
          </Tooltip>
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
    )

  const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor : "#993399", paddingRight:0, paddingLeft:matches?0:2 }}>
        <Toolbar sx={{ margin: 0, padding: 0 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            xs={{ mr: 0 }}
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
          <Box sx={{flexGrow:1}}/>
          <SearchI>
            <SearchIconWrapper>
              <Search/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Looking for books ?"
              inputProps={{ 'aria-label': 'search'}}
              sx={{fontFamily: 'McLaren, cursive'}}
            />
          </SearchI>
          {matchem?renderItem:<div><Tooltip title="Expand"><IconButton color="inherit" onClick={(event)=>{setDrawer(event.currentTarget)}}>
              <ExpandMore/>
            </IconButton></Tooltip>
            <Popover
              id='simple-popover'
              open={Boolean(drawer)}
              anchorEl={drawer}
              onClose={()=>setDrawer(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              >
            {renderItem}
          </Popover></div>}
        </Toolbar>
        <Dialog
          open={openUpdateProf}
          onClose={()=>setUpdateProf(false)}
          scroll={'body'}
          >
          <DialogTitle id="scroll-dialog-title" sx={{fontFamily: 'McLaren, cursive',}}>
            <Grid container justifyContent="space-between" alignItems={"center"}>
              <Grid item>Update Profile</Grid>
              <Grid item>
                <IconButton onClick={()=>setUpdateProf(false)}>
                  <Close/>
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
              >
              <UpdateProfile user={user}/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button startIcon={<Save />} style={{paddingRight: 14 }} onClick={()=>setUpdateProf(false)}>
              <Typography sx={{fontFamily: 'McLaren, cursive',textTransform:"none"}}>Save</Typography>
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openProf}
          onClose={()=>setProf(false)}
          scroll={'body'}
          >
          <DialogTitle id="scroll-dialog-title" sx={{fontFamily: 'McLaren, cursive',}}>
            <Grid container justifyContent="center" alignItems={"center"}>
              <Grid item>User Profile</Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
              sx={{fontFamily: 'McLaren, cursive'}}
              >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Avatar alt={user!==null?user.profileObj.name:""} src={user!==null?user.profileObj.imageUrl:""}/>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{paddingTop:1}}>
                {user!==null?user.profileObj.name:""}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{paddingTop:1}}>
                {user!==null?user.profileObj.email:""}
              </Box>
              <Grid container justifyContent="flex-left" sx={{paddingTop:1}} spacing={1}>
                <Grid item xs={6}>Age : N.A. </Grid>
                <Grid item xs={6}>Mobile : N.A.</Grid>
                <Grid item xs={12}>Address : N.A.</Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button startIcon={<Edit />} style={{paddingRight: 14 }} onClick={()=>{setProf(false);setUpdateProf(true);}}>
              <Typography sx={{fontFamily: 'McLaren, cursive',textTransform:"none"}}>Edit</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
      {renderMenu}
      <Dialog
        fullScreen
        open={cart}
        onClose={()=>{setCart(false)}}
        TransitionComponent={Transition}
        >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>{setCart(false)}}
              aria-label="close"
              >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>setCart(false)}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </Box>
  );
}

const useStyles = makeStyles(theme => ({
    paper: {
        border: '2px solid #000',
    },
}));

export default PrimarySearchAppBar;
