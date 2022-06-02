import { useState, useEffect, useRef } from 'react';
import styles from './FilterBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import images from '../../images';
import { setFilterType } from '../../redux/filterTypeReducer';
//import { debounce } from '../../helpers/debounce';

const FilterBar = ({ searchQuery }) => {
  const searchBar = useRef(null);
  const dispatch = useDispatch();
  // function debounce (fn, ms) {
  //   console.log('DEBOUNCE');
  //   console.log(fn);
  //   console.log(ms);
  //   let isCooldown = false;
  //   return function() {
  //     if (isCooldown) return;
  //     fn.apply(this, arguments);
  //     isCooldown = true;
  //     setTimeout(() => isCooldown = false, ms);
  //   };
  // };
  
  
  const filterType = useSelector(state => state.filterType.filterTypeData);
  const [ filterTypeStorage, setFilterTypeStorage ] = useLocalStorage('filterType', 'all');

  const radioHandler = e => {
    setFilterTypeStorage(e.target.value);
    dispatch(setFilterType(e.target.value));
  };

  const searchHandler = e => searchQuery(e.target.value);

  const refreshSearch = () => {
    const searchBarNode = searchBar.current;
    console.log(searchBarNode);
    if(!searchBarNode.value) return;
    searchBarNode.value = '';
    searchQuery(searchBarNode.value);
  };

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.filterSearch} onClick={refreshSearch}>
          <input ref={searchBar} className={styles.filterSearchInput} type='text' placeholder='Search for component by name' onKeyUp={searchHandler} />
          <span className={styles.filterSearchRefresh}>&#x2715;</span>
        </div>
        <div className={styles.filterTitle}>Filter by</div>
        <div className={styles.filteRadio}>
          <label className={styles.filterItem}>
            <span>All</span>
            <input className={styles.filterInput} type="radio" name="filter" value="all" onClick={radioHandler} checked={filterType == 'all'} />
          </label>
          <label className={styles.filterItem}>
            <img src={images.khoros} />
            <input className={styles.filterInput} type="radio" name="filter" value="khoros" onClick={radioHandler} checked={filterType == 'khoros'} />
          </label>
          <label className={styles.filterItem}>
            <img src={images.atlassian} />
            <input className={styles.filterInput} type="radio" name="filter" value="atlassian" onClick={radioHandler} checked={filterType == 'atlassian'} />
          </label>
        </div>
      </div>
    </>
  );
}

export default FilterBar;
