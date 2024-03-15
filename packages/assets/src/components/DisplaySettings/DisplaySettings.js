import React, {useState} from 'react';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';
import {Checkbox, Grid, Text, Box} from '@shopify/polaris';
import SliderSettings from '../SliderSettings/SliderSettings';

const DisplaySettings = () => {
  const [desktopPos, setDestopPos] = useState('bottom-left');
  const [checkedHideTime, setCheckedHideTime] = useState(false);
  const [checkedTruncate, setCheckedTruncate] = useState(true);
  return (
    <React.Fragment>
      <DesktopPositionInput
        label={'Desktop Position'}
        value={desktopPos}
        onChange={setDestopPos}
        helpText="The display position of the pop up on your website"
      />
      <Box padding="400">
        <Checkbox label="Hide time ago" checked={checkedHideTime} onChange={setCheckedHideTime} />
      </Box>
      <Box padding="400" paddingBlockStart="0">
        <Checkbox
          label="Truncate context text"
          checked={checkedTruncate}
          onChange={setCheckedTruncate}
          helpText={
            "If your product name is long for one line, it will be truncate to 'Product na...'"
          }
        />
      </Box>
      <Text fontWeight="bold">TIMING</Text>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <SliderSettings
            label="Display duration"
            min={0}
            max={60}
            initialValue={5}
            suffix="second(s)"
            helperText="How long each pop will display on your page."
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <SliderSettings
            label="Time before the first pop"
            min={0}
            max={60}
            initialValue={10}
            suffix="second(s)"
            helperText="The delay time before the first notification."
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <SliderSettings
            label="Gap time between two pops"
            min={0}
            max={60}
            initialValue={2}
            suffix="second(s)"
            helperText="The time interval between two popup notifications"
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <SliderSettings
            label="Maximum of popups"
            min={0}
            max={80}
            initialValue={20}
            suffix="pop(s)"
            helperText="The maximum number of popups are allowed to show after page loading. Maximum number is 80."
          />
        </Grid.Cell>
      </Grid>
    </React.Fragment>
  );
};

export default DisplaySettings;
