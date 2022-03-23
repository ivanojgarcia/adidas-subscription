import { notificationEmailSchema } from "../validators/notification.validators";
import loggers from '../utils/logger.utils';
const logger = loggers.get('app-logger')


export const send = async (req, res) => {
    const { body } = req;
    const { error } = notificationEmailSchema(body);
    if(error) return res.status(400).json({status: "error", message: error.message});
    try {        
        const {        
            email
        } = body;

        return res.status(200).json({
            status: "success",
            data: `Email notification sent to ${email}`
          });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json({status: "error", message: "Ups. Error to send the notification"})
    }
    
}