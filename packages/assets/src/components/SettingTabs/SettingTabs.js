import React, {useState} from 'react';
import {LegacyTabs, LegacyCard} from '@shopify/polaris';
import DisplaySettings from '../DisplaySettings/DisplaySettings';
import TriggerSettings from '../TriggerSettings/TriggerSettings';
import defaultSettings from './defaultSetting';

const SettingTabs = () => {
  const [selected, setSelected] = useState(0);
  const [input, setInput] = useState(defaultSettings);
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

export default SettingTabs;
