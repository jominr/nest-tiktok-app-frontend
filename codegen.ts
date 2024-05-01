import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  // download all the types from graphql API
  schema: "http://localhost:3000/graphql",
  // specify our documents, which are mutations and queries
  documents: ["src/graphql/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [
        // create all the types for the entities, for user post and ...
        "typescript",
        // create mutations and queries
        "typescript-operations",
        // 
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
}

export default config
