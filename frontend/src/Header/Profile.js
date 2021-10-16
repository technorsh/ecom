import React from 'react'
import {
  Grid,
  Avatar,
  Paper,
  TextField,
  Box
} from "@mui/material";

export default function UpdateProfile(props){
  return(
      <Box sx={{ flexGrow: 1 }}>
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
              defaultValue="N.A."
              size="small"
              inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
              InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              id="outlined-size-small"
              size="small"
              inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
              InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
              defaultValue={"N.A."}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Address"
              multiline
              rows={4}
              inputProps={{style: {fontFamily: 'McLaren, cursive'}}}
              InputLabelProps={{style: {fontFamily: 'McLaren, cursive'}} }
              defaultValue="N.A."
            />
          </Grid>
        </Grid>
      </Box>
  )
}
