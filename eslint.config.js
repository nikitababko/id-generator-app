import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import stylisticJs from '@stylistic/eslint-plugin-js';
import globals from 'globals';

const RULE_STATUSES = {
    OFF: 'off',
    ERROR: 'error',
    WARN: 'warn',
};


export default [
    js.configs.recommended,

    {
        languageOptions: {
            globals: {
                process: true,
                node: true,
                console: 'readonly',
                ...globals.browser
            },
        },
        ignores: ['node_modules', '.idea', 'dist', 'build'],
    },

    // TypeScript
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                sourceType: 'module',
                project: './tsconfig.json',
                tsconfigRootDir: process.cwd(),
            },
        },
        ignores: ['node_modules', '.idea', 'dist', 'build'],
        plugins: {
            '@typescript-eslint': typescript,
            '@stylistic/ts': stylisticTs,
            '@stylistic/js': stylisticJs,
            unicorn,
        },
        rules: {
            // Common
            'no-console': [RULE_STATUSES.WARN, {allow: ['warn', 'error']}],

            // TypeScript
            '@typescript-eslint/no-magic-numbers': RULE_STATUSES.OFF,
            '@typescript-eslint/consistent-type-imports': RULE_STATUSES.ERROR,
            '@typescript-eslint/no-namespace': RULE_STATUSES.OFF,
            '@typescript-eslint/ban-types': RULE_STATUSES.OFF,
            'import/prefer-default-export': RULE_STATUSES.OFF,
            'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 1, maxBOF: 0}],
            '@stylistic/ts/indent': ['error', 4],

            // Stylistic
            '@stylistic/js/arrow-parens': ['error', 'always'],
            '@stylistic/js/brace-style': ['error', '1tbs'],
            '@stylistic/js/block-spacing': ['error', 'never'],
            '@stylistic/js/max-len': ['error', {code: 90}],
            '@stylistic/js/object-curly-spacing': ['error', 'always'],
            '@stylistic/ts/quotes': ['error', 'single'],
            '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],

            // Unicorn
            'unicorn/filename-case': [
                RULE_STATUSES.ERROR,
                {cases: {camelCase: true, pascalCase: true, kebabCase: true}},
            ],
            'unicorn/prevent-abbreviations': [
                RULE_STATUSES.ERROR,
                {ignore: ['Props']},
            ],
            'unicorn/no-null': RULE_STATUSES.OFF,
            'unicorn/consistent-function-scoping': RULE_STATUSES.OFF,
        },
    },

    // JS
    {
        files: ['**/*.js'],
        rules: {
            '@typescript-eslint/no-var-requires': RULE_STATUSES.OFF,
            'unicorn/prefer-module': RULE_STATUSES.OFF,
        },
        ignores: ['node_modules', '.idea', 'dist', 'build'],
    },
];
