import joi from "joi";
/**
 *
 * @param {object string} data
 * @returns boolean
 */
export const subscriptionSchema = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().messages({
      "any.required": "The <email> parameter is required"
    }),
    firstName: joi.string().allow('').optional(),
    gender: joi.string().allow('').optional(),
    birthDay: joi.date().required().messages({
        "any.required": "The <birthDay> parameter is required"
    }),
    consent: joi.boolean().required().messages({
        "any.required": "The <consent> parameter is required"
      }),
  });
  return schema.validate(data);
};
export const subscriptionParamsSchema = (data) => {
  const schema = joi.object({
    subscriptionId: joi.string().guid({
      version: [
          'uuidv4'
      ]}).required().messages({
      "any.required": "The <email> parameter is required"
    }),
  });
  return schema.validate(data);
};
