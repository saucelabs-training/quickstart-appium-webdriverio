import config from './wdio.shared.sauce.conf';

// ==================
// Specify Test Files
// ==================
//
config.specs = ['./test/**/android.spec.ts'];

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
    platformName: 'Android',
    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    'appium:deviceName': 'Google Pixel 3 GoogleAPI Emulator',
    'appium:platformVersion': '10.0',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'storage:filename=my.rn.demo.app.android.apk',
    // @ts-ignore
    'appium:appWaitActivity': 'com.saucelabs.mydemoapp.rn.MainActivity',
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    'appium:noReset': true,
    'appium:newCommandTimeout': 240,
  },
];

exports.config = config;
