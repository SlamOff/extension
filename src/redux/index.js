import { combineReducers } from 'redux';
import { hideUnusedReducer } from './hideUnusedReducer';
import { filterTypeReducer } from './filterTypeReducer';
import { showAllReducer } from './showAllReducer';
import { activeButtonsReducer } from './activeButtonsReducer';

export const rootReducer = combineReducers({
  filterType: filterTypeReducer,
  hideUnused: hideUnusedReducer,
  showAll: showAllReducer,
  activeButtons: activeButtonsReducer
});