export const BACKEND_URL = 'http://127.0.0.1:5000';

export const parseJSON = async (response) => response.text()
  .then((text) => {
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error(`did not receive JSON. Text: ${text}`);
    }
  });
