import React, {useState} from 'react';
import {LegacyTabs, LegacyCard} from '@shopify/polaris';
import DisplaySettings from '../DisplaySettings/DisplaySettings';
import TriggerSettings from '../TriggerSettings/TriggerSettings';
import PropTypes from 'prop-types';

const SettingTabs = ({input, setInput}) => {
  const [selected, setSelected] = useState(0);
  const tabs = [
    {
      id: 'tab-1',
      content: 'Display',
      innerLabel: 'Appearance'
    },
    {
      id: 'tab-2',
      content: 'Triggers'
    }
  ];
  return (
    <LegacyCard>
      <LegacyTabs tabs={tabs} selected={selected} onSelect={setSelected}>
        <LegacyCard.Section title={tabs[selected].innerLabel}>
          {selected === 0 ? (
            <DisplaySettings input={input} setInput={setInput} />
          ) : (
            <TriggerSettings input={input} setInput={setInput} />
          )}
        </LegacyCard.Section>
      </LegacyTabs>
    </LegacyCard>
  );
};

SettingTabs.propTypes = {
  input: PropTypes.any,
  setInput: PropTypes.func
};

export default SettingTabs;
