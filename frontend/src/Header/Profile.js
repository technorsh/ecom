import React from 'react'
import {
  Grid,
  Avatar,
  Paper
} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width:'30%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'McLaren, cursive',
  bgcolor: '#ffffff',
  boxShadow: 24,
  padding:20,
  color:"#993399",
  p: 4,
};

export default function Profile(props){
  // console.log(props)
  return(
      <Paper style={style}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          >
          <Grid item>
            <Avatar alt={props.user!==null?props.user.profileObj.name:""} src={props.user!==null?props.user.profileObj.imageUrl:""}/>
          </Grid>
          <Grid item xs={6}>
            <b style={{color:"red"}}>{props.user!==null?props.user.profileObj.name:""}</b>
          </Grid>
          <Grid item >
            <b>EmailID : {props.user!==null?props.user.profileObj.email:""}</b>
          </Grid>
        </Grid>
      </Paper>
  )
}
