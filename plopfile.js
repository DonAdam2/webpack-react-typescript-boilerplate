const { isCssModules, rootDirectory } = require('./buildTools/constants');

const requireField = (fieldName) => {
	return (value) => {
		if (String(value).length === 0) {
			return fieldName + ' is required';
		}
		return true;
	};
};

const createQuestion = (type, isReducer) => {
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
			validate: requireField('name'),
		};
	}
};

module.exports = (plop) => {
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
					path: `${rootDirectory}/ts/components/{{pascalCase name}}/{{pascalCase name}}.tsx`,
					// Handlebars template used to generate content of new file
					templateFile: 'generatorTemplates/component/Component.js.hbs',
					data: { isCssModules },
				},
				{
					type: 'add',
					path: `${rootDirectory}/ts/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx`,
					templateFile: 'generatorTemplates/component/Component.test.js.hbs',
				},
			];

			if (isCssModules) {
				actionsList.push({
					type: 'add',
					path: `${rootDirectory}/ts/components/{{pascalCase name}}/{{pascalCase name}}.scss`,
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
						template: `@import 'components/{{dashCase name}}';`,
					}
				);
			}

			return actionsList;
		},
	});

	plop.setGenerator('page', {
		description: 'Create a page',
		prompts: [createQuestion('page')],
		actions: function () {
			let actionsList = [
				{
					type: 'add',
					path: `${rootDirectory}/ts/containers/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.tsx`,
					templateFile: 'generatorTemplates/page/Page.js.hbs',
					data: { isCssModules },
				},
				{
					type: 'add',
					path: `${rootDirectory}/ts/containers/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.test.tsx`,
					templateFile: 'generatorTemplates/page/Page.test.js.hbs',
				},
			];

			if (isCssModules) {
				actionsList.push({
					type: 'add',
					path: `${rootDirectory}/ts/containers/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.scss`,
					templateFile: 'generatorTemplates/component/Component.scss.hbs',
				});
			} else {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/scss/containers/pages/_{{dashCase name}}.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'append',
						path: `${rootDirectory}/scss/_containers.scss`,
						pattern: `/* PLOP_INJECT_IMPORT */`,
						template: `@import 'containers/pages/{{dashCase name}}';`,
					}
				);
			}

			return actionsList;
		},
	});

	plop.setGenerator('container', {
		description: 'Create a container',
		prompts: [createQuestion('container')],
		actions: function () {
			let actionsList = [
				{
					type: 'add',
					path: `${rootDirectory}/ts/containers/{{pascalCase name}}/{{pascalCase name}}.tsx`,
					templateFile: 'generatorTemplates/component/Component.js.hbs',
					data: { isCssModules },
				},
				{
					type: 'add',
					path: `${rootDirectory}/ts/containers/{{pascalCase name}}/{{pascalCase name}}.test.tsx`,
					templateFile: 'generatorTemplates/component/Component.test.js.hbs',
				},
			];

			if (isCssModules) {
				actionsList.push({
					type: 'add',
					path: `${rootDirectory}/ts/containers/{{pascalCase name}}/{{pascalCase name}}.scss`,
					templateFile: 'generatorTemplates/component/Component.scss.hbs',
				});
			} else {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/scss/containers/_{{dashCase name}}.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'append',
						path: `${rootDirectory}/scss/_containers.scss`,
						pattern: `/* PLOP_INJECT_IMPORT */`,
						template: `@import 'containers/{{dashCase name}}';`,
					}
				);
			}

			return actionsList;
		},
	});

	plop.setGenerator('hook', {
		description: 'Create a custom react hook',
		prompts: [createQuestion('hook')],
		actions: [
			{
				type: 'add',
				path: `${rootDirectory}/ts/customHooks/{{camelCase name}}.ts`,
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
				path: `${rootDirectory}/ts/services/{{pascalCase name}}Service.ts`,
				templateFile: 'generatorTemplates/service/Service.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/ts/services/HttpService.ts`,
				templateFile: 'generatorTemplates/service/HttpService.js.hbs',
				skipIfExists: true,
			},
		],
	});

	plop.setGenerator('reducer', {
		description: 'Create a reducer',
		prompts: createQuestion('reducer', true),
		actions: [
			{
				type: 'add',
				path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/actions/{{pascalCase name}}Actions.ts`,
				templateFile: 'generatorTemplates/reducer/Actions.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/reducers/{{pascalCase name}}Reducer.ts`,
				templateFile: 'generatorTemplates/reducer/Reducer.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/selectors/{{pascalCase name}}Selectors.ts`,
				templateFile: 'generatorTemplates/reducer/Selectors.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ActionTypes.ts`,
				templateFile: 'generatorTemplates/reducer/ActionTypes.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ActionsInterfaces.ts`,
				templateFile: 'generatorTemplates/reducer/ActionsInterfaces.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ReducersInterfaces.ts`,
				templateFile: 'generatorTemplates/reducer/ReducersInterfaces.js.hbs',
			},
			{
				type: 'append',
				path: `${rootDirectory}/ts/store/rootReducer.ts`,
				pattern: `/* PLOP_INJECT_IMPORT */`,
				template: `import {{camelCase name}} from './{{camelCase reducerEntity}}/reducers/{{pascalCase name}}Reducer';`,
			},
			{
				type: 'append',
				path: `${rootDirectory}/ts/store/rootReducer.ts`,
				pattern: `/* PLOP_INJECT_REDUCER_SLICE */`,
				template: `{{camelCase name}},`,
			},
		],
	});
};
