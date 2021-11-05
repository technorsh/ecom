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
  ShoppingCartOutlined ,
  ShoppingCart,
  Logout,
  Person,
  ExpandMore,
  Close,
  Edit,
  AddShoppingCart,
  Save,
  Cancel
} from '@mui/icons-material';

const BookDetails = (props) => {

  const [openBook, setOpenBook] = React.useState(false);
  const {value, matchem, matches, key} = props;
  console.log(value)

  let auth = "";

  let author = value.authors.map((value,key)=>{
    auth = value + ", " + auth;
  })

  return(
    <>
      <Grid item id={key} xs={matches?(matchem?3:4):6}>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...(true? { timeout: 1000 } : {})}
          >
          <Card sx={{ maxWidth: 250 , fontFamily: 'McLaren, cursive',}}>
            <CardMedia
              title="View Book Details"
              onClick={()=>{setOpenBook(true);}}
              component="img"
              alt={value.title}
              sx={{height:160,cursor: "pointer"}}
              image={value.thumbnailUrl}
            />
            <CardContent>
              <Grid container justifyContent="space-between" style={{fontFamily: 'McLaren, cursive'}} alignItems="center">
                <Grid item>
                  <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '13rem'}} title={value.title}>
                    <Typography noWrap style={{fontFamily: 'McLaren, cursive', fontSize:14, textAlign:"left", fontWeight:"bold"}} gutterBottom variant="h6">
                      {value.title}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <Grid container justifyContent="space-between" style={{fontFamily: 'McLaren, cursive'}} alignItems="center">
                    <Grid item>
                      <Typography style={{fontFamily: 'McLaren, cursive', fontSize:14, textAlign:"left", fontWeight:"bold", color:"green"}} gutterBottom variant="h6">
                        Author :
                      </Typography>
                      {value.authors.slice(0,1).map((value,key)=>{
                        return(
                          <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}} title={value}>
                            <Typography style={{textAlign:"left", fontFamily: 'McLaren, cursive',fontSize:14}} noWrap>
                              {value}
                            </Typography>
                          </div>
                        )
                      })}
                    </Grid>
                    <Grid item>
                      <IconButton size="small" onClick={()=>{setOpenBook(true);}}><AddShoppingCart/></IconButton>
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
        onClose={()=>{setOpenBook(false)}}
        scroll={'body'}
        >
        <DialogTitle id="scroll-dialog-title" sx={{fontFamily: 'McLaren, cursive',fontWeight:"bold"}}>
          <Grid container justifyContent="center" alignItems={"center"}>
            <Grid item>Book Details</Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
        <Grid item>
          <Card sx={{ maxWidth:600, fontFamily: 'McLaren, cursive'}}>
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
                    <Typography noWrap style={{fontFamily: 'McLaren, cursive', fontSize:18, textAlign:"left", fontWeight:"bold"}} gutterBottom variant="h6">
                      {value.title}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <Grid container justifyContent="space-between" style={{fontFamily: 'McLaren, cursive'}} alignItems="center">
                    <Grid item xs={8}>
                      <Grid container direction="row" alignItems= "center">
                        <Grid item>
                          <Typography style={{fontFamily: 'McLaren, cursive', textAlign:"left", fontWeight:"bold", color:"green"}} gutterBottom>
                            Author :
                          </Typography>
                        </Grid>
                        <Grid item>
                        <div style={{paddingLeft:5, overflow: "hidden", textOverflow: "ellipsis", width: '14rem'}} title={value.authors.join(", ")}>
                          <Typography style={{textAlign:"left", color:"blue", fontWeight:"bold", fontFamily: 'McLaren, cursive'}} noWrap>
                            {value.authors.join(", ")}
                          </Typography>
                        </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <IconButton size="small"><AddShoppingCart/></IconButton>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item direction="row">
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
                        {new Date(value.publishedDate["$date"]).toString()}
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
                        { value.categories.join(", ")}
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

export default BookDetails;
