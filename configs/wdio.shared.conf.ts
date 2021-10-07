export const config:WebdriverIO.Config = {
  // ==================
  // Specify Test Files
  // ==================
  //
  specs: ['./test/**/*.spec.ts'],

  // ============
  // Capabilities
  // ============
  //
  capabilities: [],

  // ===================
  // Test Configurations
  // ===================
  //
  logLevel: 'debug',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 15000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 2,
  services: [],
  // Framework you want to run your specs with.
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 180000,
  },

  // =====
  // Hooks
  // =====
  //
};
