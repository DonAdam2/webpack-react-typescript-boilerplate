const path = require('path'),
  { rootDirectory, devServer, publicDirectory } = require('../buildTools/constants');

module.exports = {
  // A list of paths to directories that Jest should use to search for files in.
  roots: [`<rootDir>/../${rootDirectory}`],
  // setupFiles before the tests are ran
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  // The glob patterns Jest uses to detect test files
  testMatch: [
    `<rootDir>/../${rootDirectory}/**/__tests__/**/*.{js,jsx,ts,tsx}`,
    `<rootDir>/../${rootDirectory}/**/*.{spec,test}.{js,jsx,ts,tsx}`,
  ],
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': [
      'babel-jest',
      { configFile: path.join(__dirname, '../babel.config.js') },
    ],
    '^.+\\.css$': '<rootDir>/transforms/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/transforms/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!.*react-error-boundary).+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.(css|sass|scss)$',
  ],
  modulePaths: [],
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources, like images or styles with a single module.
  moduleNameMapper: {
    // for css modules
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    // declaring alias for reducing the use of relative path
    '^@/jest(.*)$': '<rootDir>$1',
    '^@/assets(.*)$': `<rootDir>/../${rootDirectory}/assets/$1`,
    '^@/constants(.*)$': `<rootDir>/../${rootDirectory}/constants/$1`,
    '^@/managers(.*)$': `<rootDir>/../${rootDirectory}/managers/$1`,
    '^@/routing(.*)$': `<rootDir>/../${rootDirectory}/routing/$1`,
    '^@/store(.*)$': `<rootDir>/../${rootDirectory}/store/$1`,
    '^@/services(.*)$': `<rootDir>/../${rootDirectory}/services/$1`,
    '^@/hooks(.*)$': `<rootDir>/../${rootDirectory}/hooks/$1`,
    '^@/pages(.*)$': `<rootDir>/../${rootDirectory}/pages/$1`,
    '^@/components(.*)$': `<rootDir>/../${rootDirectory}/components/$1`,
    '^@/scss(.*)$': `<rootDir>/../${rootDirectory}/scss/$1`,
    '^@/public(.*)$': `<rootDir>/../${publicDirectory}/$1`,
  },
  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'json', 'js', 'jsx', 'node'],
  // This option allows you to use custom watch plugins
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  // Automatically reset mock state before every test
  resetMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: '<rootDir>/../coverage',
  //an array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    `../${rootDirectory}/**/*.{js,jsx,ts,tsx}`,
    //ignore the following from coverage
    `!../${rootDirectory}/index.tsx`,
    `!../${rootDirectory}/**/*.d.ts`,
    `!../${rootDirectory}/ts/store/**/*.{js,ts}`,
    `!../${rootDirectory}/ts/services/**/*.{js,ts}`,
    `!../${rootDirectory}/ts/managers/**/*.{js,ts}`,
    `!../${rootDirectory}/ts/constants/**/*.{js,ts}`,
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,
  testEnvironmentOptions: {
    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    url: devServer,
  },
};
