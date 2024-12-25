import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	// TODO: Make this dynamic
	schema: 'http://192.168.1.104:9000/graphql',
	documents: './**/*.ts',
	generates: {
		'./gql/graphql.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-graphql-request'
			],
			config: {
				documentMode: 'string'
			}
		}
	}
};

export default config;
