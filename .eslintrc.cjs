module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts', '.svelte'],
			},
		},
		'import/extensions': ['.js', '.ts', '.svelte'],
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
		// @typescript-eslint/no-explicit-any
		{
			files: ['*.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
			},
		},
	],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'@typescript-eslint/no-explicit-any': 'off',
		// Add import rules
		'import/no-unresolved': 'off', // Turn off 'Unable to resolve path to module' for Svelte files
		'import/first': 'off', // Allow imports to be mixed with other statements in Svelte script tags
		'import/no-duplicates': 'off', // Allow multiple imports from the same module in Svelte files
		'import/no-mutable-exports': 'off', // Allow Svelte writable stores
		'import/no-extraneous-dependencies': 'off', // Allow importing devDependencies in Svelte files
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				alphabetize: { order: 'asc', caseInsensitive: true },
			},
		],
	},
};
