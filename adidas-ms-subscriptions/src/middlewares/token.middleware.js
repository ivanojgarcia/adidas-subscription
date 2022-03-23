import axios from "axios";
const { API_ADMIN_TOKEN } = process.env;

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token) return res.status(403).json({ status: "error", message: 'No token provided.'});

    try {        
        await axios.post(`${API_ADMIN_TOKEN}/admin-token/verify-token`, {
            token
        })        
    } catch (error) {
        if(error.response.status === 401) return res.status(401).json({ status: "error", message: error.response.data.message});
        return res.status(500).json({ status: "error", message: error.message});        
    }

    next();
}