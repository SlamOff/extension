import styles from './ToggleCheckbox.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setHideUnused } from '../../redux/hideUnusedReducer';
import { setShowAll } from '../../redux/showAllReducer';

const ToggleCheckbox = ({ checkboxTitle }) => {
  const hideUnused = useSelector(state => state.hideUnused.hideUnusedData);
  const showAll = useSelector(state => state.showAll.showAllData);
  const dispatch = useDispatch();
  const [ hideUnusedStorage, setHideUnusedStorage ] = useLocalStorage('hideUnused', false);
  const [ showAllStorage, setShowAllStorage ] = useLocalStorage('showAll', false);
  
  const checkboxHandler = e => {
    const checked = e.target.checked;
    switch (checkboxTitle) {
      case 'Hide Unused':
        setHideUnusedStorage(checked);
        dispatch(setHideUnused(checked));
        break;
      case 'Show All':
        setShowAllStorage(checked);
        dispatch(setShowAll(checked));
        break;
    }
  };

  return (
    <div className={`${styles.CheckboxItemContainer} checkbox-container`}>
      <p>{checkboxTitle}</p>
      <label className={styles.CheckboxItem}>
        <input type='checkbox' checked={checkboxTitle == 'Hide Unused' ? hideUnused : showAll} onChange={checkboxHandler} />
        <span className={styles.CheckboxItemToggle}></span>
      </label>
    </div>
  );
}

export default ToggleCheckbox;

