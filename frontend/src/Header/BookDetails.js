import React from "react";
import {
  Typography,
  DialogTitle,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Grow,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import CartItem from "./../Cart/CartItem";
import {
  AddShoppingCart,
} from '@mui/icons-material';
import CountButton from "./../Cart/CountButton";
import { setBookCount, addBookToTempCart, addBookToCart, setLogin } from "./../store/actions"
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';

const BookDetails = (props) => {
  const [openBook, setOpenBook] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { info, isLogin, cart, value, matchem, matches, key, count, tempCart, addBookToTempCart, setBookCount, addBookToCart } = props;

// console.log(props);

  const checkBook = () => {
    let check = false;
    let info = {}
    for(let i = 0; i < cart.length; i++){
      if(cart[i].book.isbn === value.isbn){
          check = true;
          info = {book:cart[i].book, count:cart[i].count}
          // console.log(info)
          break;
      }
    }
    if(check && isLogin){
      addBookToTempCart(info);
    }else{
      addBookToTempCart({book:value,count:count});
    }
  }

  const checkItem = () => {
    if(count > 0 && isLogin){
      // Add Book to Database
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isbn:tempCart.book.isbn, count:count })
      };
      fetch("https://ecom-ducs-api.herokuapp.com/user/"+info.email+"/addBook/cart",requestOptions)
      .then((res)=>res.json())
      .then((res)=>{
        addBookToCart(tempCart);
        enqueueSnackbar(res.message, { variant:"success" });
        addBookToTempCart({book:[],count:0})
        setOpenBook(false);
      });
    }else{
      if(!isLogin){
        enqueueSnackbar("Login First!!", { variant:"info" });
      }else{
        enqueueSnackbar("Add atleast 1 book", { variant:"info" });
      }
    }
  }

  return(
    <>
      <Grid id={key} item xs={matches?(matchem?3:4):12}>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...(true? { timeout: 1000 } : {})}
          >
          <Card sx={{ maxWidth: 300 , fontFamily: 'McLaren, cursive',}}>
            <CardMedia
              title="View Book Details"
              onClick={()=>{setOpenBook(true);checkBook()}}
              component="img"
              alt={value.title}
              sx={{height:160,cursor: "pointer"}}
              image={value.thumbnailUrl}
            />
            <CardContent>
              <Grid container justifyContent="space-between" style={{fontFamily: 'McLaren, cursive'}}>
                <Grid item >
                  <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '13rem'}} title={value.title}>
                    <Typography noWrap style={{fontFamily: 'McLaren, cursive', fontSize:18, textAlign:"left", fontWeight:"bold"}} gutterBottom variant="h6">
                      {value.title}
                    </Typography>
                  </div>
                </Grid>
                <Grid item style={{flexGrow:1}}>
                  <Grid container direction="row" justifyContent="space-between" style={{fontFamily: 'McLaren, cursive'}}>
                    <Grid item>
                      <Typography style={{fontFamily: 'McLaren, cursive', fontSize:14, textAlign:"left", fontWeight:"bold", color:"green"}} gutterBottom variant="h6">
                        Author :
                      </Typography>
                      {value.authors.slice(0,1).map((value,key)=>{
                        return(
                          <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '12rem'}} title={value}>
                            <Typography style={{textAlign:"left", fontFamily: 'McLaren, cursive',fontSize:14}} noWrap>
                              {value}
                            </Typography>
                          </div>
                        )
                      })}
                    </Grid>
                    <Grid item>
                      <IconButton size="small" onClick={()=>{setOpenBook(true);checkBook();}}><AddShoppingCart/></IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grow>
      </Grid>
      <Dialog
        open={openBook}
        onClose={()=>{setOpenBook(false);setBookCount(0);addBookToTempCart({book:[],count:0})}}
        scroll={'body'}
        sx={{padding:0}}
        >
        <DialogTitle id="scroll-dialog-title" sx={{fontFamily: 'McLaren, cursive',fontWeight:"bold"}}>
          <Grid container justifyContent="center" alignItems={"center"}>
            <Grid item>Book Details</Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
        <Grid item>
          <Card sx={{ maxWidth:650, fontFamily: 'McLaren, cursive', margin:0}} >
            <CardMedia
              component="img"
              alt={value.title}
              sx={{height:160}}
              image={value.thumbnailUrl}
            />
            <CardContent>
              <Grid container justifyContent="space-between" style={{fontFamily: 'McLaren, cursive'}} alignItems="center">
                <Grid item>
                  <div style={{overflow: "hidden", textOverflow: "ellipsis"}} title={value.title}>
                    <Typography noWrap style={{fontFamily: 'McLaren, cursive', fontSize:20, textAlign:"left", fontWeight:"bold"}} gutterBottom variant="h6">
                      {value.title}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <Grid container direction="row" justifyContent={"space-between"} style={{flexGrow:1,fontFamily: 'McLaren, cursive'}} alignItems="flex-start">
                    <Grid item>
                      <Grid container justifyContent={"flex-start"} direction="row" alignItems= "center">
                        <Grid item>
                          <Typography style={{fontFamily: 'McLaren, cursive', textAlign:"left", fontWeight:"bold", color:"green"}} gutterBottom>
                            Author :
                          </Typography>
                        </Grid>
                        <Grid item>
                          <div style={{paddingLeft:5, overflow: "hidden", textOverflow: "ellipsis", width: !matches?'12em':'14em'}} title={value.authors.join(", ")}>
                            <Typography style={{textAlign:"left", color:"blue", fontWeight:"bold", fontFamily: 'McLaren, cursive'}} noWrap>
                              {value.authors.join(", ")}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item  style={{flexGrow:1}}>
                      <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={1}>
                        <Grid item>
                          <CountButton />
                        </Grid>
                        <Grid item>
                          <IconButton size="small" onClick={()=>{checkItem()}}><AddShoppingCart/></IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography style={{fontWeight:"bold",fontFamily: 'McLaren, cursive'}}>
                        Description :
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{paddingLeft:4, fontFamily: 'McLaren, cursive'}}>
                        {value.longDescription!==undefined ? value.longDescription:"Not Available"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography style={{fontWeight:"bold",fontFamily: 'McLaren, cursive'}}>
                        Page Count :
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{paddingLeft:4, fontFamily: 'McLaren, cursive'}}>
                        {( value.pageCount !== 0 )? value.pageCount : 10}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography style={{fontWeight:"bold",fontFamily: 'McLaren, cursive'}}>
                        Published Date :
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{paddingLeft:2, fontFamily: 'McLaren, cursive'}}>
                        {new Date(value.publishedAt).toDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography style={{fontWeight:"bold",fontFamily: 'McLaren, cursive'}}>
                        Categories :
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{paddingLeft:2, fontFamily: 'McLaren, cursive'}}>
                        { value.category.join(", ")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>

    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBookToTempCart: book => dispatch(addBookToTempCart(book)),
    setBookCount: count => dispatch(setBookCount(count)),
    addBookToCart: book => dispatch(addBookToCart(book)),
    setLogin: isLogin => dispatch(setLogin(isLogin))
  };
}

const mapStateToProps = (state) => {
  // console.log(state);
  return { info:state.info, isLogin:state.isLogin, cart:state.cart, books: state.books, tempCart:state.tempCart, book:state.tempCart.book, count:state.tempCart.count };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetails);
