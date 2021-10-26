import React from 'react'
import {
  Grid,
  Avatar,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  IconButton,
  Box
} from "@mui/material";
import {
  Save,
  Close
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

export default function UpdateProfile(props){

  const { info, user, UserExist, openUpdateProf, setUpdateProf } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = React.useState({age:info.age,phone:info.phone});

  const UpdateUser = () => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: info.email, name:info.name, age:data.age, phone:data.phone})
    };
    fetch("https://ecom-ducs-api.herokuapp.com/user/"+info.email+"/",requestOptions).
    then(res => res.json())
    .then((res)=>{
      setUpdateProf(false);
      enqueueSnackbar(res.message, { variant:"success" });
    })
  }
// console.log(data)
  return(
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
            <Grid
              container
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-around"
              sx={{fontFamily: 'McLaren, cursive'}}
              >
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  id="outlined-size-small"
                  size="small"
                  disabled
                  inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
                  InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
                  defaultValue={props.user!==null?props.user.profileObj.givenName:""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  id="outlined-size-small"
                  size="small"
                  disabled
                  inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
                  InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
                  defaultValue={props.user!==null?props.user.profileObj.familyName:""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email ID"
                  id="outlined-size-small"
                  size="small"
                  disabled
                  inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
                  InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
                  defaultValue={props.user!==null?props.user.profileObj.email:""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Age"
                  id="outlined-size-small"
                  defaultValue={data.age}
                  size="small"
                  onChange={(e)=>{setData({phone:data.phone,age:e.target.value})}}
                  inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
                  InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mobile Number"
                  id="outlined-size-small"
                  size="small"
                  onChange={(e)=>{setData({phone:e.target.value,age:data.age})}}
                  inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
                  InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
                  defaultValue={data.phone}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<Save />} style={{paddingRight: 14 }} onClick={()=>{UpdateUser()}}>
            <Typography sx={{fontFamily: 'McLaren, cursive',textTransform:"none"}}>Save</Typography>
          </Button>
        </DialogActions>
      </Dialog>
  )
}
