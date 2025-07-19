import 'dotenv/config';
import config from './wdio.shared.sauce.conf';
import { join } from 'path';

// ==================
// Specify Test Files
// ==================
//
config.specs = [join(__dirname, '../test/android.spec.ts')];

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
    
    // Updated to match local configuration
    'appium:deviceName': 'Google Pixel 7 GoogleAPI Emulator',
    'appium:platformVersion': '16.0',  // Match local Android 16.0
    
    // Alternative device options (uncomment to use):
    // 'appium:deviceName': 'Google Pixel 6 GoogleAPI Emulator',
    // 'appium:platformVersion': '16.0',  // Android 16
    // 'appium:deviceName': 'Samsung Galaxy S22 GoogleAPI Emulator',
    // 'appium:platformVersion': '16.0',  // Android 16
    // 'appium:deviceName': 'Google Pixel 8 GoogleAPI Emulator',
    // 'appium:platformVersion': '16.0',  // Android 16
    
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'storage:filename=my.rn.demo.app.android.apk',
    // @ts-ignore
    'appium:appWaitActivity': 'com.saucelabs.mydemoapp.rn.MainActivity',
    
    // Appium 2.x specific capabilities
    'appium:appiumVersion': '2.0.0',  // Request Appium 2.x
    // Alternative Appium versions (uncomment to use):
    // 'appium:appiumVersion': '2.1.0',  // Latest stable
    // 'appium:appiumVersion': '2.2.0',  // Latest beta
    
    'appium:autoGrantPermissions': true,
    'appium:enforceAppInstall': true,
    
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    'appium:noReset': false,
    'appium:fullReset': true,
    'appium:newCommandTimeout': 240,
  },
];

exports.config = config;
