import { cartActionType, cartInitialState, cartReducer } from './cartReducer'
import combineReducers from './combineReducers'
import { layoutActionType, layoutInitialState, layoutReducer } from './layoutReducer'
import {
  nguoiDungReducer,
  nguoiDungInitialState,
  nguoiDungActionType,
} from './nguoiDungReducer'

export type rootActionType = layoutActionType | cartActionType | nguoiDungActionType

export const initialState = {
  layout: layoutInitialState,
  cart: cartInitialState,
  nguoiDung: nguoiDungInitialState,
}

export const rootReducer = combineReducers({
  layout: layoutReducer,
  cart: cartReducer,
  nguoiDung: nguoiDungReducer,
})
