import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@/gql/graphql';

const client = new GraphQLClient(
	process.env.NEXT_PUBLIC_WORDS_API_URL as string
);

export const gqlClient = getSdk(client);
