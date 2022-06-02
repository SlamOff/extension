const SET_SHOW_ALL = 'SET_SHOW_ALL';

const defaultState = {
  showAllData: false
}

export const showAllReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SHOW_ALL:
      return {
        ...state,
        showAllData: action.payload
      }
    default:
      return state;
  }
}

export const setShowAll = showAll => ({ type: SET_SHOW_ALL, payload: showAll });