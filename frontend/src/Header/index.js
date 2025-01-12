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
  TextField,
  Menu,
  Avatar,
  ListItemIcon,
  Tooltip,
  Popover,
  Slide,
  Dialog,
  Drawer,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Login,
  Search,
  ShoppingCartOutlined ,
  Logout,
  Person,
  ExpandMore,
  Edit,
  Favorite,
  Cancel,
  Delete,
  Add,
  AddShoppingCart
} from '@mui/icons-material';
import ReactLoading from 'react-loading';

import { clearWishlist, setBooks,addBookToCart, deleteBookFromWhislist, setInfo, setLogin, clearCart } from "./../store/actions"
import { connect } from 'react-redux';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import UpdateProfile from "./Profile";
import { useSnackbar } from 'notistack';
import BookDetails from "./BookDetails";
import CartItem from "./../Cart/CartItem";

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

const PrimarySearchAppBar = (props) => {

  const { clearWishlist, addBookToCart, whislist, carts, deleteBookFromWhislist, loading, setLoading, books, info, clearCart, setBooks, setInfo, isLogin, setLogin } = props;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  // const [books, setBooks] = React.useState([]);
  // console.log(books)
  const matchem = useMediaQuery(theme.breakpoints.up('md'));
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [drawer, setDrawer] = React.useState(false);
  const [value, setSearchValue] = React.useState(null);
  const [openForm, setForm] = React.useState(false);
  const [respon, setRespon] = React.useState(null);
  const [create, setCreate] = React.useState(false);
  const [cart, setCart] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [openProf, setProf] = React.useState(false);
  const [openUpdateProf, setUpdateProf] = React.useState(false);
  const [openWhislist, setOpenWhislist ] = React.useState(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setProf(true);
    setAnchorEl(null);
    setDrawer(null);
  }

  React.useEffect(() => {
    // setLoading(true);
    if(user !== null && info.email!=null && isLogin){
      UserExist(info.email)
      .then(res => res.json())
      .then((res)=>{
        // console.log(res)
        // setUser({email:info.email, age:res.age, phone:res.phone})
        setInfo({email:info.email, age:res.age, phone:res.phone})
        setLogin(true);
      })
    }
  },[books])

  const searchData = () => {
    setLoading(true);
    if(value !== null){
      fetch("https://ecom-ducs-api.herokuapp.com/book/search/related/"+value)
      .then((res)=>res.json())
      .then((res)=>{
        setBooks(res);
        setLoading(false);
      });
    }
    if(value === ""){
      fetch("https://ecom-ducs-api.herokuapp.com/book")
      .then((res)=>res.json())
      .then((res)=>{
        // console.log(res);
        setBooks(res);
        setLoading(false);
      })
    }
  }

  React.useEffect(() => {
    setLoading(true);
    searchData();
    // console.log(value)
  },[value])


  const UserExist = async (user) => {
    return await fetch("https://ecom-ducs-api.herokuapp.com/user/"+user);
  }

  const CreateUserAccount = async (email, name, age, phone) => {
    if(phone.length === 10 && age >= 12 && age < 120){
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, name: name, age:age, phone:phone })
      };
      return await fetch("https://ecom-ducs-api.herokuapp.com/user",requestOptions);
    }else{
      enqueueSnackbar("Enter Valid Phone Number", { variant:"info" });
    }
  }

  const createUser = () => {
    CreateUserAccount(respon.profileObj.email, respon.profileObj.name, info.age, info.phone)
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      setForm(false);
      setLogin(true);
      enqueueSnackbar(res.message, { variant:"success" });
    }).catch((err)=>{
      setLogin(false);
    })
  }

  const responseGoogle = async (response) => {
    if(response.error === 'popup_closed_by_user' ){
      setUser(null);
      setLogin(false);
      enqueueSnackbar("Pop Up Closed by user!!!", { variant:"error" });
    }
    else{
      if(response.profileObj !== undefined){
        setInfo({email:response.profileObj.email, age:info.age, phone:info.phone})
        UserExist(response.profileObj.email)
        .then(res => res.json())
        .then((res) => {
          // console.log(res);
          if(res.message){
            setForm(true);
            setRespon(response);
          }else{
            setInfo({email:res.email,age:res.age,phone:res.phone,name:res.name}) //res.phone[0]
          }
          setLogin(true);
          setUser(response);
        }).catch((err)=>{
          setLogin(false);
        })
      }
      setDrawer(null);setAnchorEl(null);
    }
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
    onLogoutSuccess : (res) => {setUser(null);setDrawer(null);setAnchorEl(null);setLogin(false);clearCart({book:[],count:0});clearWishlist({book:[]});}
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
          onClick={() => {
              setOpenWhislist(isLogin?true:false)
              if(!isLogin){
                enqueueSnackbar("Login First !!", { variant:"info" });
              }
              return;
            }
          }
          >
          <Tooltip title="Wishlist">
            <Badge badgeContent={whislist.length} color="error">
              <Favorite/>
            </Badge>
          </Tooltip>
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => {
              setCart(isLogin?true:false)
              if(!isLogin){
                enqueueSnackbar("Login First !!", { variant:"info" });
              }
              return;
            }
          }
          >
          <Tooltip title="Cart">
            <Badge badgeContent={carts.length} color="primary">
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

  const data = books.map((value, key)=>{
    return(
      <BookDetails key={key} value={value} matchem={matchem} matches={matches} carts={cart} setCart={setCart}/>
    )
  })

  const PlaceOrder = () => {
    console.log("Order Placed");
    clearCart();
  }

  const removeFromWishlist = (value, ok) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isbn:value.isbn })
    };
    fetch("https://ecom-ducs-api.herokuapp.com/user/"+info.email+"/removeBook/wishlist",requestOptions)
    .then((res)=>res.json())
    .then((res)=>{
      // console.log(res);
      deleteBookFromWhislist({book:value})
      // console.log(whislist);
      if(whislist.length == 1){
        setOpenWhislist(false);
      }
      if(ok) enqueueSnackbar(res.message, { variant:"success" });
    });
  }


  const moveToCartItem = (book, count) => {
    if(count > 0 && isLogin){
      // Add Book to Database
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isbn:book.isbn, count:count })
      };
      fetch("https://ecom-ducs-api.herokuapp.com/user/"+info.email+"/addBook/cart",requestOptions)
      .then((res)=>res.json())
      .then((res)=>{
        enqueueSnackbar("Book Moved to Cart", { variant:"success" });
        addBookToCart({book:book, count:1});
        removeFromWishlist(book, false);
        // addBookToCart({book:book,count:count});
        // enqueueSnackbar(res.message, { variant:"success" });
        // addBookToTempCart({book:[],count:0})
        // setOpenBook(false);
      });
    }
  }


  const whislistBooks = whislist.map((book,id)=>{
    // console.log(book);
    return(
      <Grid item key={id}>
        <Card sx={{ display: 'flex' }} elevation={2}>
          <Box sx={{ display: 'flex', alignItems: 'center',fontFamily: 'McLaren, cursive' }}>
            <CardMedia
              component="img"
              sx={{ width: 120 }}
              image={book.book.thumbnailUrl}
              alt={book.book.title}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography component="div" variant="h6" style={{fontFamily: 'McLaren, cursive'}}>
                {book.book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div" style={{fontFamily: 'McLaren, cursive'}}>
                {book.book.authors.join(", ")}
              </Typography>
              <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={1}>
                <Grid item>
                  <Tooltip title="Move to Cart">
                    <IconButton onClick={()=>{moveToCartItem(book.book,1);}}>
                      <AddShoppingCart/>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Remove from wishlist">
                    <IconButton onClick={()=>{console.log("Delte clicked");removeFromWishlist(book.book,true);}}>
                      <Delete/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    )
  })


  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor : "#334756", paddingRight:0, paddingLeft:matches?0:2 }}>
        <Toolbar sx={{ margin: 0, padding: 0 }}>
          <img alt="logo" src="./../bookshelf.png" style={{ width: "28px", height: "28px", paddingRight:"8px" }}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, fontFamily: 'McLaren, cursive'}}
            >
            Book Smith - Donate Books & Earn Rewards
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
              onChange={(e)=>{setSearchValue(e.target.value)}}
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  searchData()}
                }}
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
        {user!==null?<UpdateProfile user={user} info={info} UserExist={UserExist} openUpdateProf={openUpdateProf} setUpdateProf={setUpdateProf}/>:""}
        <Dialog
          open={openForm}
          onClose={()=>{setForm(false);signOut();}}
          scroll={'body'}
          >
          <DialogTitle id="scroll-dialog-title" sx={{fontFamily: 'McLaren, cursive',}}>
            <Grid container justifyContent="center" alignItems={"center"}>
              <Grid item>Create User Account</Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
              sx={{fontFamily: 'McLaren, cursive'}}
              >
              <Grid container justifyContent="center" alignItems="center" direction="row" spacing={1}>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Avatar alt={user!==null?user.profileObj.name:""} src={user!==null?user.profileObj.imageUrl:""}/>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="center" sx={{paddingTop:1}}>
                    {user!==null?user.profileObj.name:""}
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="center" sx={{paddingTop:1}}>
                    {user!==null?user.profileObj.email:""}
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{paddingTop:2}}>
                    <TextField
                      label="Age"
                      id="outlined-size-small"
                      defaultValue={info.age}
                      size="small"
                      onChange ={(e)=>{setInfo({email:null, phone:info.phone, age : e.target.value})}}
                      inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
                      InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{paddingTop:2}}>
                    <TextField
                      label="Mobile Number"
                      id="outlined-size-small"
                      size="small"
                      inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
                      InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
                      defaultValue={info.mobile}
                      onChange ={(e)=>{setInfo({email:null, phone : e.target.value, age:info.age})}}
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button startIcon={<Edit />} style={{paddingRight: 14 }} onClick={()=>{createUser()}}>
              <Typography sx={{fontFamily: 'McLaren, cursive',textTransform:"none"}}>Create Account</Typography>
            </Button>
            <Button startIcon={<Cancel />} style={{paddingRight: 14 }} onClick={()=>{setForm(false); setCreate(false); signOut();}}>
              <Typography sx={{fontFamily: 'McLaren, cursive',textTransform:"none"}}>Cancel</Typography>
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openWhislist}
          onClose={()=>{setOpenWhislist(false);}}
          scroll={'body'}
          sx={{padding:0}}
          >
          <DialogTitle id="scroll-dialog-title" sx={{fontFamily: 'McLaren, cursive',fontWeight:"bold"}}>
            <Grid container justifyContent="center" alignItems={"center"}>
              <Grid item>
                <ShoppingCartOutlined sx={{paddingRight:1}}/>
              </Grid>
              <Grid item>
                My Wishlist
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
          <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
            {Array.isArray(whislist) && whislist.length !==0?whislistBooks:<Grid item><Typography variant="subtitle1" color="text.secondary" component="div" style={{fontFamily: 'McLaren, cursive', paddingTop:10}}>
              Wishlist is Empty 🥺
            </Typography></Grid>}
          </Grid>
          </DialogContent>
          <DialogActions>
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
                <Grid item xs={6}>Age : {info.age} </Grid>
                <Grid item xs={6}>Mobile : {info.phone}</Grid>
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
      <Box sx={{flexGrow:1,padding:5, paddingTop:2}}>
      <Grid container alignItems={"center"} spacing={1} justifyContent={"center"}>
        {
          !loading?
          Array.isArray(books) && books.length === 0?
          <Grid item>
            <Typography noWrap style={{fontFamily: 'McLaren, cursive',color:"#334756", fontSize:18, textAlign:"center", fontWeight:"bold"}} gutterBottom variant="h6">
              *** Book Not Found ***
            </Typography>
          </Grid>
          :<div/>:
          <Grid item>
            <ReactLoading type={"bars"} color={"#334756"} height={matchem?100:50} width={matchem?80:50} />
          </Grid>
        }
        </Grid>
        <Grid container direction={"row"} alignItems={matches?"flex-start":"center"} spacing={1} justifyContent={matches?"flex-start":"center"} >
          {
            !loading && Array.isArray(books) && books.length !== 0?
            data
            :
            <div/>
          }
        </Grid>
      </Box>
      <Drawer
        anchor="bottom"
        open={cart}
        onClose={()=>{setCart(false)}}
        ModalProps={{
          keepMounted: true,
        }}
        >
        <div
          tabIndex={0}
          role="button"
          onClick={()=>{setCart(false)}}
          >
          <Box sx={{ display: 'flex' }}>
             <CartItem setCart={setCart}/>
          </Box>
        </div>
      </Drawer>
    </Box>
  );
}

const useStyles = makeStyles(theme => ({
    paper: {
        border: '2px solid #000',
    },
}));

function mapDispatchToProps(dispatch) {
  return {
    setInfo : info => dispatch(setInfo(info)),
    setBooks: books => dispatch(setBooks(books)),
    setLogin: isLogin => dispatch(setLogin(isLogin)),
    clearCart: book => dispatch(clearCart(book)),
    clearWishlist: book => dispatch(clearWishlist(book)),
    deleteBookFromWhislist: book => dispatch(deleteBookFromWhislist(book)),
    addBookToCart: book => dispatch(addBookToCart(book)),
  };
}

const mapStateToProps = state => {
  // console.log(state);
  return { whislist:state.whislist, books: state.books, info : state.info, isLogin : state.isLogin , carts:state.cart};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimarySearchAppBar);
