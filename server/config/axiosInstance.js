const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'https://example-cve-api.com', // Replace with the base URL for your CVE API
    timeout: 10000, // 10 seconds timeout
    headers: { 'Content-Type': 'application/json' }
});

module.exports = axiosInstance;
