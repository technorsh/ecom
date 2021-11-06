import { PLUSBOOK , MINUSBOOK } from "./../actions/constants";

export default function checkDataMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      console.log(action)
      // if(action.type === SET_IMAGE) {
      //
      // }
      return next(action);
    }
  }
}
