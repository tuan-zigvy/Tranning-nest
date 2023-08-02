/* eslint-disable import/no-extraneous-dependencies */
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:9000/graphql',
  documents: ['src/**/*{.ts,.tsx}', 'src/hook/query.ts'],
  generates: {
    './src/gql/type.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
  ignoreNoDocuments: true,
  watch: true,
};

// const config: CodegenConfig = {
//   schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
//   documents: ['src/**/*{.ts,.tsx}', 'src/hook/query.ts'],
//   ignoreNoDocuments: true,
//   generates: {
//     './src/gql/': {
//       preset: 'client',
//     },
//   },
// };

export default config;
