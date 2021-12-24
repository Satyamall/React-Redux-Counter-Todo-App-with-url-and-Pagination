import { createStore } from "redux";
import reducer from "./reducer";

export const store = createStore(reducer);

console.log(store.getState());

// create actions
// create reducer
// create store
// pass store in provider
// select data from store, and
//  ---- pass it to required elements
// dispatch an action depending on user input
