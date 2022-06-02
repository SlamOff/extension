import React from 'react';
import styles from './Accordion.module.css';

const AccordionContent = ({ alias, description, name, selector, type, documentationUrls, hasPii, hasUgc, thirdPartyServices, relatedAtlassianFeatureService, preComponentSelector, isHidden }) => {
  return (
    <>
      <div className={`${styles.accordionContainer} ${isHidden ? styles.accordionContainerHidden : ''}`}>
        <div className={styles.buttonAccordionContent}>
          <p><b>Alias:</b>{alias}</p>
          <p><b>Description:</b> {description}</p>
          <p><b>Name:</b> {name}</p>
          <p><b>Selector:</b> {selector}</p>
          <p><b>Documentation URLs:</b> {documentationUrls}</p>
          <p><b>Type:</b> {type}</p>
          <p><b>PII:</b> {hasPii}</p>
          <p><b>UGC:</b> {hasUgc}</p>
          <p><b>Third party services:</b> {thirdPartyServices}</p>
          <p><b>Related atlassian features:</b> {relatedAtlassianFeatureService}</p>
          <p><b>Pre-component:</b> {preComponentSelector}</p>
        </div>
      </div>
    </>
  );
};

export default AccordionContent;
