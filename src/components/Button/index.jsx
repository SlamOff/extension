import React, { useState, useEffect } from 'react';
import styles from './Button.module.css';
import Tooltip from '../Tooltip';
import AccordionContent from '../AccordionContent';
import { createPortal } from 'react-dom';
import images from '../../images';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveButtons } from '../../redux/activeButtonsReducer';

const Button = ({ alias, description, name, selector, type, documentationUrls, hasPii, hasUgc, thirdPartyServices, relatedAtlassianFeatureService, preComponent }) => {
  //const accordionContent = useRef(null);
  // const { filterType, hideUnused, showAll } = useSelector(state => {
  //   console.log('STATE USESELE');
  //   console.log(state);
  //   return state;
  // });
  
  const hideUnused = useSelector(state => state.hideUnused.hideUnusedData);
  const filterType = useSelector(state => state.filterType.filterTypeData);
  const showAll = useSelector(state => state.showAll.showAllData);
  const activeButtons = useSelector(state => state.activeButtons.activeButtonsData);
  
  const dispatch = useDispatch();
  const element = document.querySelector(selector);
  const [ isActiveArray, setIsActiveArray] = useLocalStorage('activeButtons', []);
  const [ isActive, setIsActive ] = useState(false);
  const [ isOnPage, setIsOnPage ] = useState(element != null);
  const [ isAccordionOpened, setIsAccordionOpened ] = useState(false);

  useEffect(() => {
    if(showAll) {
      setIsActive(true);
    } else {
      setIsActive(activeButtons.includes(selector));
    }
  }, [activeButtons, showAll]);

  const setHiddenClass = () => {
    if (filterType == 'all') {
      if (hideUnused && !isOnPage) {
        return true;
      } else {
        return false;
      }
    } else {
      if (type == filterType) {
        if (hideUnused && !isOnPage) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  };

  // const renderAccordionContent = () => {
  //   if (isAccordionOpened || !(isAccordionOpened && hideUnused && !isOnPage)) {
  //     return <AccordionContent alias={alias} description={description} aa={isOnPage} />;
  //   }
  //   else if (isAccordionOpened && hideUnused && !isOnPage) {
  //     return;
  //   }
  // };

  const setActiveButtonToStorage = () => {
    let current = JSON.parse(localStorage.getItem('activeButtons')) || [];
    if (current.includes(selector)) return;
    let newArr = current.concat(selector);
    setIsActiveArray(newArr);
    dispatch(setActiveButtons(newArr));
  };

  const removeActiveButtonToStorage = () => {
    let current = JSON.parse(localStorage.getItem('activeButtons')) || [];
    let index = current.indexOf(selector);
    current.splice(index, 1);
    setIsActiveArray(current);
    dispatch(setActiveButtons(current));
  };

  const clickButton = () => {
    if (!isOnPage || (showAll && !isOnPage)) return false;
    if (isActive) {
      removeActiveButtonToStorage();
    } else {
      setActiveButtonToStorage();
      element.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  const clickAccordion = (e) => {
    e.stopPropagation();
    isAccordionOpened ? setIsAccordionOpened(false) : setIsAccordionOpened(true);
  }

  if (isOnPage) {
    if (getComputedStyle(element).position == "static") {
      element.style.position = "relative";
    }
  };

  useEffect(() => {
    if (element != null) {
      if (getComputedStyle(element).position == "static") {
        element.style.position = "relative";
      }
      setIsOnPage(true);
    } else {
      setIsOnPage(false);
    }
  }, []);

  return (
    <>
      <div className={styles.buttonContainer}>
        <div className={`${styles.button} ${isActive && isOnPage ? styles.active : ''} ${isOnPage ? '' : styles.inactive} ${setHiddenClass() ? styles.hidden : ''}`} data-name={name} data-type={type} onClick={clickButton}>
          <div className={styles.buttonInnerContainer}>
            <p>{name}</p>
            {/* Uncomment to see current REDUX STORE
              {' :: IsonPage: ' + isOnPage}
              {', filterType: ' + filterType}
              {', showAll: ' + showAll}
              {', hideUnused: ' + hideUnused}
            */}
            <img src={type == 'atlassian' ? images.atlassian : images.khoros} />
          </div>
          <button className={styles.buttonAccordion} onClick={clickAccordion}><span className={`${styles.buttonAccordionIcon} ${isAccordionOpened ? styles.accordionIconRotate : ''}`}></span></button>
        </div>
        {isAccordionOpened && <AccordionContent alias={alias} description={description} name={name} selector={selector} type={type} documentationUrls={documentationUrls} hasPii={hasPii} hasUgc={hasUgc} thirdPartyServices={thirdPartyServices} relatedAtlassianFeatureService={relatedAtlassianFeatureService} preComponentSelector={preComponent} aa={!isOnPage && hideUnused} isHidden={setHiddenClass()} />}
      
      </div>
      {isActive && isOnPage && (
        <Tooltip name={name} type={type} isVisible={isActive} element={element} preComponent={preComponent} />
      )}
    </>
  );
};

export default Button;
