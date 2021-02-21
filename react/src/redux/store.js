import { applyMiddleware, createStore } from "redux";
import usersReducer from './reducers/users'
import thuk from 'redux-thunk'

const store = createStore(usersReducer, applyMiddleware(thuk))
export default store