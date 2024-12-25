import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@/gql/graphql';

const client = new GraphQLClient(`${process.env.WORDS_API_URL}`);

export const gqlClient = getSdk(client);
