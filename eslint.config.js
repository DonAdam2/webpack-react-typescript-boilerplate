const path = require('path'),
  js = require('@eslint/js'),
  react = require('eslint-plugin-react'),
  reactHooks = require('eslint-plugin-react-hooks'),
  jest = require('eslint-plugin-jest'),
  testingLibrary = require('eslint-plugin-testing-library'),
  jestDom = require('eslint-plugin-jest-dom'),
  prettier = require('eslint-plugin-prettier'),
  prettierConfig = require('eslint-config-prettier'),
  typescriptEslint = require('@typescript-eslint/eslint-plugin'),
  typescriptParser = require('@typescript-eslint/parser'),
  importPlugin = require('eslint-plugin-import'),
  globals = require('globals');

module.exports = [
  // ESLint recommended
  js.configs.recommended,

  // JavaScript files (including config files)
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
  },

  // JavaScript module files
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2015,
      },
    },
  },

  // Jest test files and setup files
  {
    files: ['**/jest/**/*.js', '**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2015,
      },
    },
  },

  // TypeScript ESLint recommended
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 6,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true,
          arrowFunctions: true,
          restParams: true,
          experimentalObjectRestSpread: true,
        },
        babelOptions: {
          configFile: path.join(__dirname, 'babel.config.js'),
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.es2015,
        // Additional Jest globals
        it: 'readonly',
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      jest: jest,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
      prettier: prettier,
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
    },
    rules: {
      // TypeScript ESLint recommended rules
      ...typescriptEslint.configs.recommended.rules,

      // React recommended rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // React Hooks recommended
      ...reactHooks.configs.recommended.rules,

      // Jest recommended
      ...jest.configs.recommended.rules,
      ...jest.configs.style.rules,

      // Testing Library React
      ...testingLibrary.configs.react.rules,

      // Jest DOM recommended
      ...jestDom.configs.recommended.rules,

      // Custom overrides from original config
      'prettier/prettier': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      'react/no-unescaped-entities': 'off',

      // Ensure React hooks rules are active
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import ordering rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',   // Node.js built-in modules
            'external',  // npm packages
            'internal',  // Internal modules (using pathGroups below)
            'parent',    // Parent directory imports
            'sibling',   // Sibling directory imports
            'index',     // Index file imports
          ],
          pathGroups: [
            // React should come first
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react/**',
              group: 'external',
              position: 'before',
            },
            // Internal modules in specified order
            {
              pattern: '@/jest/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/services/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/hooks/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/managers/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/routing/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/constants/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/scss/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/assets/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/public/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      'import/resolver': {
        webpack: {
          config: path.join(__dirname, 'buildTools/webpack.common.js'),
        },
        typescript: {
          alwaysTryTypes: true,
          project: path.join(__dirname, 'tsconfig.json'),
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      react: {
        version: 'detect',
      },
    },
  },

  // Prettier config (disables conflicting rules) - applied last
  prettierConfig,
];
