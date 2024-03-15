import React from 'react';
import PropTypes from 'prop-types';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';
import {Checkbox, Grid, Text, Box} from '@shopify/polaris';
import SliderSettings from '../SliderSettings/SliderSettings';
import defaultSliderSettings from './defaultSliderSettings';

const DisplaySettings = ({input, setInput}) => {
  return (
    <React.Fragment>
      <DesktopPositionInput
        label={'Desktop Position'}
        value={input.position}
        onChange={position => {
          setInput(prev => ({...prev, position}));
        }}
        helpText="The display position of the pop up on your website"
      />
      <Box padding="400">
        <Checkbox
          label="Hide time ago"
          checked={input.hideTimeAgo}
          onChange={hideTimeAgo => {
            setInput(prev => ({...prev, hideTimeAgo}));
          }}
        />
      </Box>
      <Box padding="400" paddingBlockStart="0">
        <Checkbox
          label="Truncate context text"
          checked={input.truncateProductName}
          onChange={truncateProductName => {
            setInput(prev => ({...prev, truncateProductName}));
          }}
          helpText={
            "If your product name is long for one line, it will be truncate to 'Product na...'"
          }
        />
      </Box>
      <Text fontWeight="bold">TIMING</Text>
      <Grid>
        {defaultSliderSettings.map((setting, index) => {
          return (
            <Grid.Cell key={index} columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
              <SliderSettings
                label={setting.label}
                min={setting.min}
                max={setting.max}
                suffix={setting.suffix}
                helperText={setting.helperText}
                value={input[setting.propName]}
                setValue={value => {
                  setInput(prev => ({...prev, [setting.propName]: value}));
                }}
              />
            </Grid.Cell>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

DisplaySettings.propTypes = {
  input: PropTypes.any,
  setInput: PropTypes.func
};

export default DisplaySettings;
