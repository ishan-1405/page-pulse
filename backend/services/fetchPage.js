const axios = require('axios');

async function fetchPage(url) {
  const startTime = Date.now();

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    const responseTime = Date.now() - startTime;

    if (!response.headers['content-type']?.includes('text/html')) {
      throw new Error('Response is not HTML');
    }

    return {
      statusCode: response.status,
      responseTime,
      html: response.data,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      const timeoutError = new Error('Request timed out after 10 seconds');
      timeoutError.responseTime = responseTime;
      throw timeoutError;
    }

    if (error.message === 'Response is not HTML') {
      const htmlError = new Error('Response is not HTML');
      htmlError.responseTime = responseTime;
      throw htmlError;
    }

    const networkError = new Error('Network failure while fetching page');
    networkError.responseTime = responseTime;
    networkError.statusCode = error.response?.status || 500;
    throw networkError;
  }
}

module.exports = fetchPage;
