# Running Appium Tests on Sauce Labs Platform
...

## Important information
### Environment variables for Sauce Labs
The examples in this repository that can run on Sauce Labs use environment variables, make sure you've added the following

    # For Sauce Labs Real devices in the New UI
    export SAUCE_USERNAME=********
    export SAUCE_ACCESS_KEY=*******

### Demo app(s)
The Native demo app that has been used for all these tests can be found [here](apps). There are three apps:

- [`my.rn.demo.app.android.apk`](apps/my.rn.demo.app.android.apk) which can be used for **AND** and Android emulator
**AND** an Android real device
- [`my.rn.demo.app.ios.sim.zip`](apps/my.rn.demo.app.ios.sim.zip) which can **ONLY** be used for iOS simulators
- [`my.rn.demo.app.ios.real.device.ipa`](apps/my.rn.demo.app.ios.real.device.ipa) which can **ONLY** be used for iOS real devices

### Upload apps to Sauce Storage
...

## Run Native App tests on Sauce Labs Android emulators in the Sauce Labs Platform
If you want to run the Native Android App tests on Sauce Labs emulators then you can run the Android tests with

    // If using the US DC
    npm run test.android.sauce.emu.us
    
    // If using the EU DC
    npm run test.android.sauce.emu.eu

The tests will be executed on a Google Pixel 3 GoogleAPI Emulator.

## Run Native App tests on Sauce Labs Android real devices in the Sauce Labs Platform
If you want to run the Native Android App tests on Sauce Labs real devices then you can run the Android tests with

    // If using the US DC
    npm run test.android.sauce.real.device.us
    
    // If using the EU DC
    npm run test.android.sauce.real.device.eu

The tests will be executed on a (Samsung Galaxy S(7|8|9|10|20|21).*)|(Google Pixel.*), which means every available 
Samsung Galaxy or Google Pixel that matches this regular expression.

## Run Native App tests on Sauce Labs iOS simulators in the Sauce Labs Platform
If you want to run the Native iOS App tests on Sauce Labs simulators then you can run the iOS tests with

    // If using the US DC
    npm run test.ios.sauce.sim.us
    
    // If using the EU DC
    npm run test.ios.sauce.sim.eu

The tests will be executed on a iPhone 12.

## Run Native App tests on Sauce Labs iOS real devices in the Sauce Labs Platform
If you want to run the Native iOS App tests on Sauce Labs real devices then you can run the iOS tests with

    // If using the US DC
    npm run test.ios.sauce.real.device.us
    
    // If using the EU DC
    npm run test.ios.sauce.real.device.eu

The tests will be executed on an iPhone (11|12|13|X.*).*, which means every available iPhone that matches this regular 
expression.

