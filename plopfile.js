const { isCssModules, rootDirectory, buildToolsDirectory } = require('./buildTools/constants'),
  fs = require('fs');

const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return fieldName + ' is required';
    }
    return true;
  };
};

const startsWithUseKeyWord = () => {
  return (value) => {
    if (String(value).startsWith('use')) {
      return true;
    }
    return 'Custom hooks should start with use keyword';
  };
};

const isStoreEntityExist = (entityName) => fs.existsSync(`./${rootDirectory}/store/${entityName}`);

const createQuestion = (type) => {
  const isReducer = type === 'reducer',
    isHook = type === 'hook';

  if (isReducer) {
    return [
      {
        type: 'input',
        name: 'reducerEntity',
        message: `What is your entity name (directory in store)?`,
        validate: requireField('reducerEntity'),
      },
      {
        type: 'input',
        name: 'name',
        message: `What is your ${type} name?`,
        validate: requireField('name'),
      },
    ];
  } else {
    return {
      // Raw text input
      type: 'input',
      // Variable name for this input
      name: 'name',
      // Prompt to display on command line
      message: `What is your ${type} name?`,
      // make sure that name is not empty
      validate: isHook ? requireField('name') && startsWithUseKeyWord() : requireField('name'),
    };
  }
};

const generatePage = () => {
  let actionsList = [
    {
      type: 'add',
      path: `${rootDirectory}/pages/{{camelCase name}}Page/{{pascalCase name}}Page.tsx`,
      templateFile: 'generatorTemplates/page/Page.js.hbs',
      data: { isCssModules },
    },
    {
      type: 'add',
      path: `${rootDirectory}/pages/{{camelCase name}}Page/{{pascalCase name}}Page.test.tsx`,
      templateFile: `generatorTemplates/page/Page.test.js.hbs`,
    },
  ];

  if (isCssModules) {
    actionsList.push({
      type: 'add',
      path: `${rootDirectory}/pages/{{camelCase name}}Page/{{pascalCase name}}Page.scss`,
      templateFile: 'generatorTemplates/component/Component.scss.hbs',
    });
  } else {
    actionsList.push(
      {
        type: 'add',
        path: `${rootDirectory}/scss/pages/_{{dashCase name}}-page.scss`,
        templateFile: 'generatorTemplates/component/Component.scss.hbs',
      },
      {
        type: 'append',
        path: `${rootDirectory}/scss/_pages.scss`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `@use './pages/{{dashCase name}}-page';`,
      }
    );
  }

  return actionsList;
};

module.exports = async (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [createQuestion('component')],
    actions: function () {
      let actionsList = [
        {
          // Add a new file
          type: 'add',
          // Path for the new file
          path: `${rootDirectory}/components/{{camelCase name}}/{{pascalCase name}}.tsx`,
          // Handlebars template used to generate content of new file
          templateFile: 'generatorTemplates/component/Component.js.hbs',
          data: { isCssModules },
        },
        {
          type: 'add',
          path: `${rootDirectory}/components/{{camelCase name}}/{{pascalCase name}}.test.tsx`,
          templateFile: 'generatorTemplates/component/Component.test.js.hbs',
        },
      ];

      if (isCssModules) {
        actionsList.push({
          type: 'add',
          path: `${rootDirectory}/components/{{camelCase name}}/{{pascalCase name}}.scss`,
          templateFile: 'generatorTemplates/component/Component.scss.hbs',
        });
      } else {
        actionsList.push(
          {
            type: 'add',
            path: `${rootDirectory}/scss/components/_{{dashCase name}}.scss`,
            templateFile: 'generatorTemplates/component/Component.scss.hbs',
          },
          {
            type: 'append',
            path: `${rootDirectory}/scss/_components.scss`,
            pattern: `/* PLOP_INJECT_IMPORT */`,
            template: `@use './components/{{dashCase name}}';`,
          }
        );
      }

      return actionsList;
    },
  });

  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [createQuestion('page')],
    actions: generatePage(),
  });

  plop.setGenerator('hook', {
    description: 'Create a custom react hook',
    prompts: [createQuestion('hook')],
    actions: [
      {
        type: 'add',
        path: `${rootDirectory}/hooks/{{camelCase name}}.ts`,
        templateFile: 'generatorTemplates/hook.js.hbs',
      },
    ],
  });

  plop.setGenerator('service', {
    description: 'Create a service',
    prompts: [createQuestion('service')],
    actions: [
      {
        type: 'add',
        path: `${rootDirectory}/services/{{pascalCase name}}Service.ts`,
        templateFile: 'generatorTemplates/service/Service.js.hbs',
      },
      {
        type: 'add',
        path: `${rootDirectory}/services/HttpService.ts`,
        templateFile: 'generatorTemplates/service/HttpService.js.hbs',
        skipIfExists: true,
      },
    ],
  });

  plop.setGenerator('reducer', {
    description: 'Create a reducer',
    prompts: createQuestion('reducer'),
    actions: function (data) {
      let actionsList = [
        {
          type: 'add',
          path: `${rootDirectory}/store/{{camelCase reducerEntity}}/slices/{{pascalCase name}}Slice.ts`,
          templateFile: 'generatorTemplates/reducer/Slice.js.hbs',
        },
        {
          type: 'add',
          path: `${rootDirectory}/store/{{camelCase reducerEntity}}/selectors/{{pascalCase name}}Selectors.ts`,
          templateFile: 'generatorTemplates/reducer/Selectors.js.hbs',
        },
        {
          type: 'append',
          path: `${rootDirectory}/store/reduxSlices.ts`,
          pattern: `/* PLOP_INJECT_IMPORT */`,
          template: `import {{camelCase name}} from './{{camelCase reducerEntity}}/slices/{{pascalCase name}}Slice';`,
        },
        {
          type: 'append',
          path: `${rootDirectory}/store/reduxSlices.ts`,
          pattern: `/* PLOP_INJECT_REDUCER_SLICE */`,
          template: `{{camelCase name}},`,
        },
      ];

      //if store entity (directory) exists
      if (isStoreEntityExist(data.reducerEntity)) {
        actionsList.push({
          type: 'append',
          path: `${rootDirectory}/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}EntityInterfaces.ts`,
          pattern: `/* PLOP_INJECT_REDUCER_INTERFACE */`,
          template: `
						export interface {{pascalCase name}}SliceInitialState {
							testString: string;
						}
						`,
        });
      } else {
        actionsList.push({
          type: 'add',
          path: `${rootDirectory}/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}EntityInterfaces.ts`,
          templateFile: 'generatorTemplates/reducer/EntityInterfaces.js.hbs',
        });
      }

      return actionsList;
    },
  });

  const dontCacheBustURLsMatching = /\.[0-9a-f]{8}\./;
  // exclude = [/\.map$/, /asset-manifest\.json$/, /LICENSE/];

  plop.setGenerator('progressiveWebApp', {
    description: 'Add required files for progressive web app',
    prompts: [],
    actions: [
      {
        type: 'add',
        path: `${rootDirectory}/serviceWorker/swSource.ts`,
        templateFile: 'generatorTemplates/progressiveWebApp/swSource.ts.hbs',
      },
      {
        type: 'add',
        path: `${rootDirectory}/serviceWorker/swRegistration.ts`,
        templateFile: 'generatorTemplates/progressiveWebApp/swRegistration.ts.hbs',
      },
      {
        type: 'append',
        path: `${rootDirectory}/index.tsx`,
        pattern: `/* PLOP_INJECT_PWA_IMPORTS */`,
        template: `import registerServiceWorker from './serviceWorker/swRegistration';`,
      },
      {
        type: 'append',
        path: `${rootDirectory}/index.tsx`,
        pattern: `/* PLOP_INJECT_PWA_REGISTERER */`,
        template: `registerServiceWorker();`,
      },
      {
        type: 'append',
        path: `${buildToolsDirectory}/webpack.prod.js`,
        pattern: `/* PLOP_INJECT_PWA_IMPORTS */`,
        template: `{ InjectManifest } = require('workbox-webpack-plugin'),
                   WebpackPwaManifest = require('webpack-pwa-manifest'),`,
      },
      {
        type: 'append',
        path: `${buildToolsDirectory}/webpack.prod.js`,
        pattern: `/* PLOP_INJECT_PWA_PATH_IMPORTS */`,
        template: 'swSourcePath, swIconPath',
      },
      {
        type: 'append',
        path: `${buildToolsDirectory}/webpack.prod.js`,
        pattern: `/* PLOP_INJECT_PWA_PLUGINS */`,
        template: `new WebpackPwaManifest({
          filename: 'manifest.webmanifest',
          background_color: '#000000',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          id: '/',
          orientation: 'any',
          name: 'website long name',
          short_name: 'website short name',
          description: 'website description',
          categories: ['technology', 'web'],
          icons: [
            {
              src: swIconPath('assets/images/pwa/icon_192x192.png'),
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
              destination: 'assets/images/pwa',
              ios: true,
            },
            {
              src: swIconPath('assets/images/pwa/icon_256x256.png'),
              sizes: '256x256',
              type: 'image/png',
              destination: 'assets/images/pwa',
            },
            {
              src: swIconPath('assets/images/pwa/icon_384x384.png'),
              sizes: '384x384',
              type: 'image/png',
              destination: 'assets/images/pwa',
            },
            {
              src: swIconPath('assets/images/pwa/icon_512x512.png'),
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
              destination: 'assets/images/pwa',
            },
          ],
        }),
        new InjectManifest({
          //this is the source of your service worker setup
          swSrc: swSourcePath,
          dontCacheBustURLsMatching: ${dontCacheBustURLsMatching},         
          // Bump up the default maximum size (2mb) to (5mb) that's precached,
          // to make lazy-loading failure scenarios less likely.
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          //this is the output name of your service worker file
          swDest: 'serviceWorker.js',
        }),`,
      },
    ],
  });
};
