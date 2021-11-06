import { initialState } from "./../initialState";
import { ADDBOOKTOTEMPCART, SETBOOKS, PLUSMINUSBOOK, ADDBOOKTOCART, DELETEBOOKFROMCART } from "./../actions/constants";

const updatedData = ( cart, data ) => {
  let newState = []
  cart.cart.map((book,id) => {
    if(book.book.isbn === data.book.isbn){
        newState.push({book:data.book, count:data.count})
    }else{
      newState.push({book:book.book, count:book.count})
    }
    return;
  });
  return newState;
}

const removeData = ( cart , data ) => {
  let newState = []
  cart.cart.map((book,id) => {
    if(book.book.isbn !== data.book.isbn){
      newState.push({book:book.book, count:book.count})
    }
    return;
  });
  console.log(newState)
  return newState;
}
// const removePDFData = ( index , state ) => {
//   state.pdfs.splice(index,1);
//   return state.pdfs;
// }
//
const checkExist = (state, index) => {
  return state.cart.some( book => {
    return book.book.isbn === index;
  });
}


const rootReducer = (state = initialState, action) => {
  // console.log(state)
  switch(action.type){
    case SETBOOKS:{
      return Object.assign({},state,{
        books:action.books,
        tempCart:state.tempCart,
        cart:state.cart,
        user:state.user,
        isLogin:state.isLogin
      })
      break;
    }
    case ADDBOOKTOTEMPCART:{
      return Object.assign({},state,{
        books:state.books,
        tempCart: { book : action.book.book, count : action.book.count},
        cart:state.cart,
        user:state.user,
        isLogin:state.isLogin
      })
      break;
    }
    case PLUSMINUSBOOK:{
      return Object.assign({},state,{
        books:state.books,
        tempCart:{ book : state.tempCart.book, count:action.count},
        cart:state.cart,
        user:state.user,
        isLogin:state.isLogin
      })
      break;
    }
    case ADDBOOKTOCART:{
      let add = checkExist(state, action.book.book.isbn);
      return Object.assign({}, state, {
        books:state.books,
        tempCart:{ book : state.tempCart.book, count:state.tempCart.count},
        cart:add ? updatedData(state, action.book) : state.cart.concat(action.book),
        user:state.user,
        isLogin:state.isLogin
      });
      break;
    }
    case DELETEBOOKFROMCART:{
      let add = checkExist(state, action.book.book.isbn);
      return Object.assign({}, state, {
        books:state.books,
        tempCart:{ book : state.tempCart.book, count:state.tempCart.count},
        cart:add ? removeData(state, action.book) : state.cart.concat(action.book),
        user:state.user,
        isLogin:state.isLogin
      });
      break;
    }
    default :
      return state;
  }
};

export default rootReducer;
