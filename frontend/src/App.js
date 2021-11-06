import './App.css';
import PrimarySearchAppBar from './Header';
import React from "react";
import { connect } from 'react-redux';
import { setBooks } from "./store/actions"
import books from "./books.json"; // Book fetch from data base here

const App = (props) => {

  const { setBooks } = props;

  React.useEffect(()=>{
    setBooks(books);
  },[]);

  return (
    <div className="App">
        <PrimarySearchAppBar/>
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
