import {config} from './wdio.shared.conf';

// ===================
// Test Configurations
// ===================
//
config.services = [
  [
    'appium',
    {
      command: 'appium',
      port: 4723,
    },
  ],
];

export default config;
