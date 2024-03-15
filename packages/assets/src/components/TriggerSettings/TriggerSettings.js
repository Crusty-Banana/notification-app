import React from 'react';
import PropTypes from 'prop-types';
import {Select, TextField, Box} from '@shopify/polaris';

const TriggerSettings = ({input, setInput}) => {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];
  return (
    <React.Fragment>
      <Select
        label="PAGES RESTRICTION"
        options={options}
        value={input.allowShow}
        onChange={allowShow => setInput(prev => ({...prev, allowShow}))}
      />
      {input.allowShow === 'specific' && (
        <Box paddingBlockStart={400}>
          <TextField
            label="Included Pages"
            helpText="Page URLs to show the pop-up (separated by new lines)"
            value={input.includedUrls}
            onChange={includedUrls => setInput(prev => ({...prev, includedUrls}))}
            multiline={4}
          />
        </Box>
      )}
      <Box paddingBlockStart={400}>
        <TextField
          label="Excluded Pages"
          helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          value={input.excludedUrls}
          onChange={excludedUrls => setInput(prev => ({...prev, excludedUrls}))}
          multiline={4}
        />
      </Box>
    </React.Fragment>
  );
};

TriggerSettings.propTypes = {
  input: PropTypes.any,
  setInput: PropTypes.func
};

export default TriggerSettings;
