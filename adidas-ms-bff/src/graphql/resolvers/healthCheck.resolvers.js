import humanizeDuration from "humanize-duration";
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getHealthCheck = () => {
  return {
    message: process.env.SERVICE_NAME,
    uptime: humanizeDuration(Math.round(process.uptime() * 1000), {
      language: "es",
    }),
  };
};
