import React, {useState} from 'react';
import {Select, TextField, Box} from '@shopify/polaris';

const TriggerSettings = () => {
  const [restriction, setRestriction] = useState('All pages');
  const [excludedPage, setExcludedPage] = useState('');
  const [includedPage, setIncludedPage] = useState('');
  const options = [
    {label: 'All pages', value: 'All pages'},
    {label: 'Specific pages', value: 'Specific pages'}
  ];
  return (
    <React.Fragment>
      <Select
        label="PAGES RESTRICTION"
        options={options}
        value={restriction}
        onChange={setRestriction}
      />
      {restriction === 'Specific pages' && (
        <Box paddingBlockStart={400}>
          <TextField
            label="Included Pages"
            helpText="Page URLs to show the pop-up (separated by new lines)"
            value={includedPage}
            onChange={setIncludedPage}
            multiline={4}
          />
        </Box>
      )}
      <Box paddingBlockStart={400}>
        <TextField
          label="Excluded Pages"
          helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          value={excludedPage}
          onChange={setExcludedPage}
          multiline={4}
        />
      </Box>
    </React.Fragment>
  );
};

export default TriggerSettings;
