const SET_HIDE_UNUSED = 'SET_HIDE_UNUSED';

const defaultState = {
  hideUnusedData: false
}

export const hideUnusedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_HIDE_UNUSED:
      return {
        ...state,
        hideUnusedData: action.payload
      }
    default:
      return state;
  }
}

export const setHideUnused = hideUnused => ({ type: SET_HIDE_UNUSED, payload: hideUnused });