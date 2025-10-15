export const typeDefs = `#graphql
    type CatFact {
        fact: String!
        length: Int!
    }

    type User {
        email: String!
        name: String!
        stack: String!
    }

    type RandomNFactResponse {
        status: String!
        user: User!
        timestamp: String!
        fact: String!
    }

    type Query {
        getAPIcatfact: CatFact!
        getUserDetails: User!
        getRandomnfact: RandomNFactResponse!
    }
`;
