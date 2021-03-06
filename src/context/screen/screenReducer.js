import {CHANGE_SCREEN} from "../types";

const handlers = {
  [CHANGE_SCREEN]: (state, {id}) => ({...state, id})
}


export const screenReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}