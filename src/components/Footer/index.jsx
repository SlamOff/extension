import ToggleCheckbox from '../ToggleCheckbox';
import styles from './Footer.module.css';
import { useDispatch } from 'react-redux';
import { setActiveButtons } from '../../redux/activeButtonsReducer';
import { setFilterType } from '../../redux/filterTypeReducer';
import { setHideUnused } from '../../redux/hideUnusedReducer';
import { setShowAll } from '../../redux/showAllReducer';
import images from '../../images';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Footer = () => {
  const dispatch = useDispatch();
  const [ isActiveArray, setIsActiveArray ] = useLocalStorage('activeButtons', []);
  const [ filterTypeStorage, setFilterTypeStorage ] = useLocalStorage('filterType', 'all');
  const [ showAllStorage, setShowAllStorage ] = useLocalStorage('showAll', false);
  const [ hideUnusedStorage, setHideUnusedStorage ] = useLocalStorage('hideUnused', false);

  // const defaultState = {
  //   setActiveButtons: [],
  //   setShowAll: false,
  //   setHideUnused: false,
  //   setFilterType: 'all'
  // };

  const reset = () => {
    dispatch(setActiveButtons([]));
    dispatch(setShowAll(false));
    dispatch(setHideUnused(false));
    dispatch(setFilterType('all'));
    setIsActiveArray([]);
    setShowAllStorage(false);
    setHideUnusedStorage(false);
    setFilterTypeStorage('all');
  };

  return (
    <footer className='footer'>
      <div className={styles.filter}>
        <ToggleCheckbox checkboxTitle='Show All' />
        <ToggleCheckbox checkboxTitle='Hide Unused' />
        <div className={styles.reset}>
          Reset Filters
          {/* <img src={images.reset} onClick={reset} /> */}
          <img src='https://w1.pngwing.com/pngs/232/771/png-transparent-reset-icon-reset-button-icon-design-menu-bar-hamburger-button-computer-black-and-white-text.png' onClick={reset} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
