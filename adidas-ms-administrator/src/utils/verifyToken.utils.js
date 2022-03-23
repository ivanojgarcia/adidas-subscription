import jwt from 'jsonwebtoken';

export const verify = async token => {
    try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        return decoded;
    } catch (err) {
         return { error: true, message: err.message } 
    }
    
}