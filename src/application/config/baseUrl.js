const axios = require('axios');

/**
 *
 * @param 'Authorization',
 * @param 'Content-Type',
 * @param 'Cookie'
 * @return {Promise}
 */

module.exports = axios.create({
  baseURL: process.env.URL_API_JIRA,
  timeout: 50000,
  headers: {
    Authorization: process.env.AUTH_JIRA,
    'Content-Type': process.env.CONTENT_TYPE_JSON,
    Cookie: process.env.COOKIE_JIRA,
  },
  withCredentials: true,
});
