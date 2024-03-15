import React, {useState} from 'react';
import {LegacyTabs, LegacyCard} from '@shopify/polaris';
import DisplaySettings from '../DisplaySettings/DisplaySettings';

const SettingTabs = () => {
  const [selected, setSelected] = useState(0);
  const tabs = [
    {
      id: 'tab-1',
      content: 'Display',
      innerLabel: 'Appearance',
      panelID: 'all-customers-content-1'
    },
    {
      id: 'tab-2',
      content: 'Triggers',
      panelID: 'accepts-marketing-content-1'
    }
  ];
  return (
    <LegacyCard>
      <LegacyTabs tabs={tabs} selected={selected} onSelect={setSelected}>
        <LegacyCard.Section title={tabs[selected].innerLabel}>
          {selected === 0 && <DisplaySettings />}
        </LegacyCard.Section>
      </LegacyTabs>
    </LegacyCard>
  );
};

export default SettingTabs;
