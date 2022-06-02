import styles from './Tooltip.module.css';
import images from '../../images';
import { createPortal } from 'react-dom';

const Tooltip = ({ name, type, isVisible, element, preComponent }) => {
  if(preComponent && isVisible) {
    document.querySelector(preComponent).click();
  }

  return (
    isVisible && element && createPortal(
      <div className={`${styles.TooltipContainer} ${!isVisible ? styles.TooltipHidden : ''}`}>
        <div className={styles.Tooltip}>
          <span>{name}</span>
          <img src={type == 'atlassian' ? images.atlassian : images.khoros} />
        </div>
      </div>,
      element
    )
  );
}

export default Tooltip;
