import React, {useState} from 'react';
import {RangeSlider, Box, TextField, Text} from '@shopify/polaris';
import PropTypes from 'prop-types';

const SliderSettings = ({label, min, max, suffix, helperText, value, setValue}) => {
  return (
    <React.Fragment>
      <RangeSlider
        label={label}
        min={min}
        max={max}
        value={value}
        onChange={setValue}
        suffix={
          <Box maxWidth="100px">
            <TextField
              value={value}
              onChange={duration => setValue(Number(duration))}
              suffix={suffix}
            />
          </Box>
        }
        output
      />
      <Text tone="subdued">{helperText}</Text>
    </React.Fragment>
  );
};

SliderSettings.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  initialValue: PropTypes.number,
  suffix: PropTypes.any,
  helperText: PropTypes.string
};

export default SliderSettings;
