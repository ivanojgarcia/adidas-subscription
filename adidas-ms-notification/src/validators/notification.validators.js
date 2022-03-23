import joi from "joi";
/**
 *
 * @param {object string} data
 * @returns boolean
 */
export const notificationEmailSchema = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().messages({
      "any.required": "The <email> parameter is required"
    }),
  });
  return schema.validate(data);
};
