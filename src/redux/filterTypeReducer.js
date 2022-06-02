const SET_FILTER_TYPE = 'SET_FILTER_TYPE';

const defaultState = {
  filterTypeData: 'all'
}

export const filterTypeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FILTER_TYPE:
      return {
        ...state,
        filterTypeData: action.payload
      }
    default:
      return state;
  }
}

export const setFilterType = filterType => ({ type: SET_FILTER_TYPE, payload: filterType });