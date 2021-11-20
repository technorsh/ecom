import './App.css';
import PrimarySearchAppBar from './Header';
import React from "react";
import { connect } from 'react-redux';
import { setBooks } from "./store/actions";
// import books from "./books.json"; // Book fetch from data base here

const App = (props) => {

  const { setBooks } = props;
  const [loading , setLoading] = React.useState(true);

  React.useEffect(()=>{
    fetch("https://ecom-ducs-api.herokuapp.com/book")
    .then((res)=>res.json())
    .then((res)=>{
      // console.log(res);
      setBooks(res);
      setLoading(false);
    })
  },[]);

  return (
    <div className="App">
        <PrimarySearchAppBar loading={loading} setLoading={setLoading}/>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBooks: books => dispatch(setBooks(books)),
  };
}

const mapStateToProps = (state) => {
  return { books: state.books };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
