import joi from "joi";
/**
 *
 * @param {object string} data
 * @returns boolean
 */
export const adminTokenSchema = (data) => {
  const schema = joi.object({
    username: joi.string().required().messages({
      "any.required": "The <username> parameter is required",
    }),
    password: joi.string().required().messages({
      "any.required": "The <password> parameter is required",
    }),
  });
  return schema.validate(data);
};
