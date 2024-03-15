const defaultSliderSettings = [
  {
    label: 'Display duration',
    min: 0,
    max: 60,
    suffix: 'second(s)',
    helperText: 'How long each pop will display on your page.',
    propName: 'displayDuration'
  },
  {
    label: 'Time before the first pop',
    min: 0,
    max: 60,
    suffix: 'second(s)',
    helperText: 'The delay time before the first notification.',
    propName: 'firstDelay'
  },
  {
    label: 'Gap time between two pops',
    min: 0,
    max: 60,
    suffix: 'second(s)',
    helperText: 'The time interval between two popup notifications',
    propName: 'popsInterval'
  },
  {
    label: 'Maximum of popups',
    min: 0,
    max: 80,
    suffix: 'pop(s)',
    helperText:
      'The maximum number of popups are allowed to show after page loading. Maximum number is 80.',
    propName: 'maxPopsDisplay'
  }
];

export default defaultSliderSettings;
