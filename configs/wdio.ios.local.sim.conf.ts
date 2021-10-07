import {join} from 'path';
import config from './wdio.shared.local.appium.conf';

// ==================
// Specify Test Files
// ==================
//
config.specs = ['./test/**/ios.spec.ts'];

// ============
// Capabilities
// ============
//
config.maxInstances = 1;
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: 'iOS',
    maxInstances: 1,
    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    'appium:deviceName': 'iPhone 12',
    'appium:platformVersion': '14.5',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'XCUITest',
    // The path to the app
    'appium:app': join(
      __dirname,
      '../',
      './apps/my.rn.demo.app.ios.sim.zip',
    ),
    'appium:newCommandTimeout': 240,
  },
];

exports.config = config;
