import { gql } from 'apollo-server-express';
import { getHealthCheck } from './resolvers/healthCheck.resolvers';
import { create } from './resolvers/subscription.resolvers';

export const typeDefs = gql `
    type Subscription {
        id: String
        email: String
        birthDay: String
        consent: Boolean
        gender: String
        firstName: String
    }

    input SubscriptionInput {
        email: String
        birthDay: String
        consent: Boolean
        gender: String
        firstName: String
    }

    type HealthCheck {
        message: String
        uptime: String
    }

    type Query {
        healthCheck: HealthCheck
    }
    type Mutation {
        createSubscription(input: SubscriptionInput): Subscription
    }
` 

export const resolvers = {
    Query: {
        healthCheck: ()  => {
            return getHealthCheck();
        }
    },
    Mutation: {
        createSubscription: async (_, {input}) => {
            return await create(input);
        }
    }
}