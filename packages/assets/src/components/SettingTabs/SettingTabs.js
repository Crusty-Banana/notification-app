import React, {useState} from 'react';
import {
  LegacyTabs,
  LegacyCard,
  SkeletonTabs,
  SkeletonDisplayText,
  SkeletonBodyText,
  TextContainer
} from '@shopify/polaris';
import DisplaySettings from '../DisplaySettings/DisplaySettings';
import TriggerSettings from '../TriggerSettings/TriggerSettings';
import PropTypes from 'prop-types';

const SettingTabs = ({input, setInput, loading = false}) => {
  const [selected, setSelected] = useState(0);
  const tabs = [
    {
      id: 'tab-1',
      content: 'Display',
      innerLabel: 'Appearance',
      contentBody: <DisplaySettings input={input} setInput={setInput} />
    },
    {
      id: 'tab-2',
      content: 'Triggers',
      contentBody: <TriggerSettings input={input} setInput={setInput} />
    }
  ];
  if (loading) {
    return (
      <LegacyCard>
        <SkeletonTabs />
        <LegacyCard.Section>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </LegacyCard.Section>
      </LegacyCard>
    );
  }
  return (
    <LegacyCard>
      <LegacyTabs tabs={tabs} selected={selected} onSelect={setSelected}>
        <LegacyCard.Section title={tabs[selected].innerLabel}>
          {tabs[selected].contentBody}
        </LegacyCard.Section>
      </LegacyTabs>
    </LegacyCard>
  );
};

SettingTabs.propTypes = {
  input: PropTypes.any,
  setInput: PropTypes.func,
  loading: PropTypes.bool
};

export default SettingTabs;
