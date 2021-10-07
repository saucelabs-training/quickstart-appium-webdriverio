import config from './wdio.shared.sauce.conf';

const buildName = `iOS My Demo app: ${new Date().getTime()}`;

// ==================
// Specify Test Files
// ==================
//
config.specs = ['./test/**/ios.spec.ts'];

// ============
// Capabilities
// ============
//
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: 'iOS',
    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    'appium:deviceName': 'iPhone 12 Simulator',
    'appium:platformVersion': '14.5',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'XCUITest',
    // The path to the app
    'appium:app': 'storage:filename=my.rn.demo.app.ios.sim.zip',
    'sauce:options': {
      build: buildName
    },
    'appium:newCommandTimeout': 240,
  },
];

exports.config = config;
