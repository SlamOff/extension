import React, { useState, useEffect } from 'react';
import styles from './Tabs.module.css';
import TabsContent from './TabsContent';
import FilterBar from '../FilterBar';

const Tabs = () => {
  const [ active, setActive ] = useState(0);
  const [ communityData, setCommunityData ] = useState([]);
  const [ searchText, setSearchText ] = useState('');

  const openTab = e => setActive(+e.target.dataset.index);

  let pageInfo = [
    {
      key: 0,
      name: 'Components'
    },
    {
      key: 1,
      name: 'Khoros details',
      data: {}
    },
    {
      key: 2,
      name: 'Page details',
      data: {}
    },
    {
      name: 'User details',
      key: 3,
      data: {}
    },
  ];

  const fn = value => {
    setSearchText(value);
 }
  
  const injectScript = (file_path, tag) => {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
  };

  injectScript(window.chrome.runtime.getURL('inject.js'), 'body');

  useEffect (() => {
    window.addEventListener('message', e => {
      if (e.source != window) return;
      if (e.data.type && (e.data.type == "FROM_ATLASSIAN") ) {
        const { CoreNode, Page, Server, User } = e.data.communityData;
  
        pageInfo[1].data = {
          communityPrefix: Server.communityPrefix,
          version: Server.version
        };
  
        pageInfo[2].data = {
          skins: Page.skins,
          pageName: Page.name,
          pageId: Page.object.id,
          page: Page.object.page,
          pageType: Page.object.type,
          coreId: CoreNode.id,
          nodeType: CoreNode.nodeType,
          conversationStyle: CoreNode.conversationStyle
        };
  
        pageInfo[3].data = {
          isAnonymous: User.isAnonymous,
          id: User.id,
          aid: User.aid,
          login: User.login,
          bunchballRole: User.bunchballRole,
          rank: User.rank,
          roles: User.roles
        };

        setCommunityData(pageInfo);
      }
    }, false);
  }, []);

  return (
    <>
      <ul id="tabs" className={styles.tabs}>
        {communityData.length && communityData.map((item, index) => (
          <button
            className={`${styles.tabsItem} ${index === active ? styles.active : ''}`}
            onClick={openTab}
            data-index={index}
            key={item.key}
          >{item.name}</button>
        ))}
      </ul>
      <FilterBar searchQuery={fn} />
      <div className={styles.tabContainer}>
        {communityData[active] && <TabsContent searchText={searchText} key={communityData[active].key} name={communityData[active].name} data={communityData[active].data} />}
      </div>
    </>
  );
};

export default Tabs;
