import React from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { setBookCount } from "./../store/actions"
import { connect } from 'react-redux';

const CountButton = (props) => {
  // const [counter, setCounter] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const { count, setBookCount } = props;
  const displayCounter = count > 0;


  React.useEffect(()=>{
    if(count > 3){
      enqueueSnackbar("Book Count Should be <= 3", { variant:"info" });
    }
  },[count])

  const handleIncrement = () => {
    setBookCount(count + 1);
  };

  const handleDecrement = () => {
    setBookCount(count - 1);
  };

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button disabled={count >= 3} onClick={()=>handleIncrement()}>+</Button>
      {displayCounter && <Button disabled><Typography style={{fontWeight:"bold", fontSize:12, fontFamily: 'McLaren, cursive'}}>{count}</Typography></Button>}
      {displayCounter && <Button onClick={()=>handleDecrement()}>-</Button>}
    </ButtonGroup>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setBookCount: count => dispatch(setBookCount(count)),
  };
}

const mapStateToProps = (state) => {
  return { book:state.tempCart.book, count:state.tempCart.count };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountButton);
