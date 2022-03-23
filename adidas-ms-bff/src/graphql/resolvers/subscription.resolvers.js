import dotenv from "dotenv";
dotenv.config();
import loggers from '../../utils/logger.utils';
const logger = loggers.get('app-logger')

import axios from "axios";
const { 
    API_ADMIN_TOKEN, 
    API_SUBSCRIPTION,
    USER_M2M,
    PASS_M2M ,
    API_NOTIFICATIONS
} = process.env;
const getTokenUrl = `${API_ADMIN_TOKEN}/admin-token/login`;
const subscriptionUrl = `${API_SUBSCRIPTION}/subscription`;
const notificationUrl = `${API_NOTIFICATIONS}/notification`;


export const create = async (input) => {
  
        let tokenResult;
        
        const {
            email,
            birthDay,
            consent,
            gender,
            firstName
        } = input
        /**
         * Service to generate the access token
         */
        logger.info("Get token...")
        try {
            tokenResult = await axios.post(getTokenUrl, {
                username: USER_M2M,
                password: PASS_M2M
            })
        } catch (err) {
            throw Error(`AUTHENTICATION ERROR: ${err.response.data.message}`) 
        }
        /**
         * Service to create the subscription
         */
        logger.info("Creating the subscription...")
        try {
            const responseSubscription = await axios.post(`${subscriptionUrl}/`, {
                email,
                birthDay,
                consent,
                gender,
                firstName
            },
            {
                headers: {'x-access-token': tokenResult.data.data.token}
            }
            );
            logger.info("Subscription created...")
            console.log("🚀 ~ file: subscription.resolvers.js ~ line 59 ~ create ~ tokenResult.data.data.token", tokenResult.data.data.token)
            /**
             * Service to send the notification
             */
            logger.info("Sending email notification...")
            await axios.post(`${notificationUrl}/send-email`, {
                email
            },
            {
                headers: {'x-access-token': tokenResult.data.data.token}
            })
            logger.info("Email notification sent...")
            return responseSubscription.data.data;
        } catch (error) {
            logger.error(error)
            throw Error(`SUBSCRIPTION ERROR: ${error.response.data.message}`)        
        }
    
}