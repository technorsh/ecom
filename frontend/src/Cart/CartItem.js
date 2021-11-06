import React from "react";
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
  Modal,
  Backdrop,
  Popover,
  Slide,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Drawer,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  Button,
  DialogActions,
  Grid,
  Zoom,
  Fade,
  Grow,
  Card,
  CardMedia,
  CardActions,
  CardContent
} from '@mui/material';
import {
  Login,
  Search,
  Edit,
  Delete,
  ShoppingCartOutlined ,
  ShoppingCart,
  Logout,
  Person,
  ExpandMore,
  Close,
  AddShoppingCart,
  Save,
  Cancel
} from '@mui/icons-material';

import { setBookCount, addBookToTempCart, addBookToCart, deleteBookFromCart } from "./../store/actions"
import { connect } from 'react-redux';

const CartItem = (props) => {
  const { cart, setCart,deleteBookFromCart } = props;

  // console.log(cart)

  const books = cart.map((book,id)=>{
    // console.log(book);
    return(
      <Grid item>
        <Card sx={{ display: 'flex' }} elevation={4}>
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
              <Typography variant="subtitle1" color="text.secondary" component="div" style={{fontFamily: 'McLaren, cursive'}}>
                Book Count : {book.count}
              </Typography>
              <Grid container direction="row" justifyContent="flex-end" spacing={1}>
                <Grid item>
                  {/*}<IconButton onClick={()=>{}}>
                    <Edit/>
                  </IconButton>*/}
                </Grid>
                <Grid item>
                  <IconButton onClick={()=>{console.log("Delte clicked");deleteBookFromCart(book);setCart(true)}}>
                    <Delete/>
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    )
  })

  return(
    <Card sx={{ flexGrow:1, fontFamily: 'McLaren, cursive',paddingTop:2, paddingLeft:2,}}>
      <Grid container alignItems="center">
        <Grid item>
          <ShoppingCart/>
        </Grid>
        <Grid item>
          <Typography component="div" variant="h6" style={{ textAlign:"left", fontWeight:"bold",fontFamily: 'McLaren, cursive'}}>
             My Cart
          </Typography>
        </Grid>
      </Grid>
      <CardContent>
        <Grid container direction="row" style={{fontFamily: 'McLaren, cursive'}} spacing={1}>
          {( Array.isArray(cart) && cart.length ) ? books : <Grid item xs={12}>
            <Typography style={{ flex:1, textAlign:"center", paddingBottom:10, fontWeight:"bold",fontFamily: 'McLaren, cursive'}}> No Book in Cart </Typography>
          </Grid>}
        </Grid>
      </CardContent>
    </Card>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBookToTempCart: book => dispatch(addBookToTempCart(book)),
    setBookCount: count => dispatch(setBookCount(count)),
    addBookToCart: book => dispatch(addBookToCart(book)),
    deleteBookFromCart : index => dispatch(deleteBookFromCart(index)),
  };
}

const mapStateToProps = (state) => {
  return { cart:state.cart, books: state.books, tempCart:state.tempCart, book:state.tempCart.book, count:state.tempCart.count };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItem);
