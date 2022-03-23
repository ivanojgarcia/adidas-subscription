import { comparePassword, createHash } from "../utils/handlerpassword.utils";
import { adminTokenSchema } from "../validators/adminToken.validators";
import {adminToken as AdminTokenModel} from "../database/models";
import GenerateToken from "../utils/generateToken.utils";

import loggers from '../utils/logger.utils';
import { verify } from "../utils/verifyToken.utils";
const logger = loggers.get('app-logger')

export const create = async (req, res) => {
    const { body } = req;
    const { error } = adminTokenSchema(body);

    if(error) return res.status(400).json({status: "error", message: error.message});
    
    const { username, password } = body;
    const newUser = {
        admin_user: username,
        password: await createHash(password),
        is_valid: true
    }
    try {
        const tokenCreated = await AdminTokenModel.create(newUser);
        const token = GenerateToken(tokenCreated);
        return res.status(200).json({
            status: "success",
            data: {user: tokenCreated, token}
          });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json({status: "error", message: "Ups. Error to create the admin token"})
    }
};
export const login = async (req, res) => {
    const { body } = req;
    const { error } = adminTokenSchema(body);
    if(error) return res.status(400).json({status: "error", message: error.message});

    const { username, password } = body;
    try {
        const userdata = await AdminTokenModel.findOne({ attributes: ["id", "admin_user", "password", "is_valid"], where: { admin_user: username } });
        if(!userdata) return res.status(404).json({status: "error", message: "User not found."});
    
        const validPassword = await comparePassword( password, userdata.password );
        if(!validPassword) return res.status(401).json({status: "error", message: "Invalid Password."});
        const token = GenerateToken(userdata);
        return res.status(200).json({
            status: "success",
            data: {
                token
            }
          });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json({status: "error", message: "Ups. Error to create the admin token"})
    }
};
export const verifyToken = async (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        const tokenVerified = await verify(token);
        console.log("🚀 ~ file: adminToken.controller.js ~ line 62 ~ verifyToken ~ tokenVerified", tokenVerified)
        if(tokenVerified.error) return res.status(401).send({status: "error", message: tokenVerified.message});
        const user = await AdminTokenModel.findByPk(tokenVerified.id);
        if(!user) return res.status(403).json({status: "error", message: "User not found."});

        return res.status(200).json({
            status: "success",
            data: user
          });
      } else {
        return res.status(403).send({
            status: "error",
            message: 'No token provided.'
        });
      }
};