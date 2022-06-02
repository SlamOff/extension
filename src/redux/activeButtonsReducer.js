const ACTIVE_BUTTONS = 'ACTIVE_BUTTONS';

const defaultState = {
  activeButtonsData: []
}

export const activeButtonsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIVE_BUTTONS:
      return {
        ...state,
        activeButtonsData: action.payload
      }
    default:
      return state;
  }
}

export const setActiveButtons = activeButtons => ({ type: ACTIVE_BUTTONS, payload: activeButtons });