import { subscriptionSchema, subscriptionParamsSchema } from "../validators/subscription.validators";
import { subscription as SubscriptionModel } from "../database/models";
import loggers from '../utils/logger.utils';
const { v4: uuidv4 } = require('uuid');
const logger = loggers.get('app-logger')


export const create = async (req, res) => {
    const { body } = req;
    const { error } = subscriptionSchema(body);
    if(error) return res.status(400).json({status: "error", message: error.message});
    try {
        
    const {        
        email,
        birthDay,
        consent,
        gender,
        firstName
    } = body; 
    const subscriptionData = {
        id: uuidv4(),
        first_name: firstName || "",
        email,
        gender: gender || "",
        consent,
        birth_day: birthDay

    }
    
        const subscriptionExist = await SubscriptionModel.findOne({where: {
            email
        }});
        if(subscriptionExist) return res.status(400).json({status: "error", message: "The user is subscribed"});
        const subscriptionCreated = await SubscriptionModel.create(subscriptionData);
        
        return res.status(200).json({
            status: "success",
            data: subscriptionCreated
          });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json({status: "error", message: "Ups. Error to create the subscription"})
    }
    
}

export const getAll = async (req, res) => {
    const { query: {limit, page} } = req;
    const offset = +page === 1 ? 0: (+page - 1) * limit;
    try {
        const { count, rows } = await SubscriptionModel.findAndCountAll({
            offset: offset || 0,
            limit: limit || 10
          });
        
        return res.status(200).json({
            status: "success",
            data: {
                rows,
                count
            }
          });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json({status: "error", message: "Ups. Error to get all the subscriptions"})
    }
    
}
export const getById = async (req, res) => {
    const { params } = req;
    const { error } = subscriptionParamsSchema(params);
    if(error) return res.status(400).json({status: "error", message: error.message});
    
    try {
        const subscriptioDetail = await SubscriptionModel.findByPk(params.subscriptionId);
        if(!subscriptioDetail) return res.status(404).json({status: "error", message: "Subscription not found."});
        
        return res.status(200).json({
            status: "success",
            data: subscriptioDetail
          });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json({status: "error", message: "Ups. Error to get the subscription detail"})
    }
    
}
export const removeSubscription = async (req, res) => {
    const { params: {email} } = req;
    if(!email) return res.status(400).json({status: "error", message: "The parameter email is required"});
    
    try {
        const user = await SubscriptionModel.findOne({where: {email}})
        if(!user) return res.status(404).json({status: "error", message: "The user has not subscribed."});
        await SubscriptionModel.destroy({where: {email}});
        
        return res.status(200).json({
            status: "success",
            data: "The user was Unsubscribed"
          });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json({status: "error", message: "Ups. Error to get the subscription detail"})
    }
    
}