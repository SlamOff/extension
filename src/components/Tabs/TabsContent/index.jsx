import React, { useEffect } from 'react';
import styles from './TabsItem.module.css';
import Button from '../../Button';
import components from '../../../components.json';

const TabsItem = ({ data, name, key, searchText }) => {
  const getAliasComparison = aliasArr => {
    if (!aliasArr.length) return;
    return aliasArr.some(item => item.indexOf(searchText) >= 0);
  };

  const renderButtons = () => {
    const filterData = components.filter(item => item.name.indexOf(searchText) >= 0 || getAliasComparison(item.alias));
    if (!filterData.length) return <div className={styles.tabsEmpty}>There are no Components!</div>;
    return filterData.map((item) => <Button key={item.id} alias={item.alias} description={item.description} name={item.name} selector={item.selector} type={item.type} documentationUrls={item['documentation-urls']} hasPii={item['has-pii']} hasUgc={item['has-ugc']} thirdPartyServices={item['third-party-services']} relatedAtlassianFeatureService={item['related-atlassian-feature-service']} preComponent={item['pre-component-selector']} />);
  };
  
  return (
    <>
      <div className={styles.tabsItem}>
        <h3 className={styles.tabsItemTitle}>{name}:</h3>
        {!data ? (
          <div id="components-list" className={styles.componentsList}>
            {renderButtons()}
          </div>
        ) : (
          <ul className={styles.tabsItemList}>
            {Object.keys(data).map(item => <li key={key}>{item}: {data[item]}</li>)}
          </ul>
        )}
      </div>
    </>
  );
};

export default TabsItem;
