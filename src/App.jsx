import { useState, useEffect, useRef } from 'react';
import Tabs from './components/Tabs';
import './App.css';
import Footer from './components/Footer';
import store from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
  const [ isEnabled, setIsEnabled ] = useState(true);
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  const appRef = useRef(null);

  const getCoords = elem => {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top,
      left: box.left
    };
  };

  const clickHandler = e => {
    isCollapsed ? setIsCollapsed(false) : setIsCollapsed(true);
    e.target.checked = true;
  };

  

  const dragHandler = e => {
    if(e.target.tagName == 'BUTTON') return;

    const app = appRef.current;
    const currentCoords = getCoords(app);
   

    const shift = {
      x: e.clientX - currentCoords.left,
      y: e.clientY - currentCoords.top
    }

    const moveAt = e => {
      if (getCoords(app).left <= 0) {
        app.style.left = 1 + 'px';
      } else if (getCoords(app).left + parseInt(getComputedStyle(app).width) > window.innerWidth) {
        app.style.left = (window.innerWidth - parseInt(getComputedStyle(app).width)) - 1 + 'px';
      } else {
        app.style.left = e.clientX - shift.x + 'px';
        app.style.top = e.clientY + 'px';
      }
      
    }

    document.onmousemove = e => {
      moveAt(e);
    };
  
    app.onmouseup = () => {
      document.onmousemove = null;
      app.onmouseup = null;
    };
  }

  return (
    isEnabled && (
      <Provider store={store}>
        <div className="App" ref={appRef}>
          <header className='header' onMouseDown={dragHandler}>
            <button onClick={clickHandler}>{isCollapsed ? 'Expand' : 'Collapse'}</button>
          </header>
            <div className={`container ${isCollapsed ? 'hidden': ''}`}>
              <Tabs />
              <Footer />
            </div>
        </div>
      </Provider>
    )
  );
}

export default App;
