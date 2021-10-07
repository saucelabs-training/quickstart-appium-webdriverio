import config from './wdio.shared.sauce.conf';

const buildName = `iOS My React Native Demo app: ${new Date().getTime()}`;

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
    // We're using dynamic device allocation
    // See https://docs.saucelabs.com/mobile-apps/automated-testing/appium/real-devices/#dynamic-device-allocation
    deviceName: 'iPhone (11|12|13|X.*).*',
    automationName: 'XCUITest',
    // The name of the App in the Sauce Labs storage, for more info see
    // https://docs.saucelabs.com/mobile-apps/app-storage/
    app: 'storage:filename=my.rn.demo.app.ios.real.device.ipa',
    noReset: true,
    build: buildName,
    newCommandTimeout: 240,
  },
];

exports.config = config;
