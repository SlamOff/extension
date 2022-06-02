import { rootReducer } from './index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';

const getStorageInitialData = (type, initial) => JSON.parse(localStorage.getItem(type)) || initial;

const persistedState = {
  filterType: {filterTypeData: getStorageInitialData('filterType', 'all')},
  hideUnused: {hideUnusedData: getStorageInitialData('hideUnused', false)},
  showAll: {showAllData: getStorageInitialData('showAll', false)},
  activeButtons: {activeButtonsData: getStorageInitialData('activeButtons', [])}
}

const store = createStore(rootReducer, persistedState, composeWithDevTools());

export default store;