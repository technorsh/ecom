import { ADDBOOKTOTEMPCART, SETBOOKS, PLUSMINUSBOOK, ADDBOOKTOCART, DELETEBOOKFROMCART } from "./constants";

export const setBooks = ( books ) => {
  return { type : SETBOOKS, books }
}

export const addBookToTempCart = ( book ) => {
  return { type : ADDBOOKTOTEMPCART, book }
}

export const setBookCount = ( count ) => {
  return { type : PLUSMINUSBOOK, count }
}

export const addBookToCart = ( book ) => {
  console.log(book)
  return { type : ADDBOOKTOCART, book }
}

export const deleteBookFromCart = ( book ) => {
  return { type : DELETEBOOKFROMCART, book }
}
