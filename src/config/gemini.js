import axios from 'axios';

// Lambda Function URL
const LAMBDA_FUNCTION_URL = 'https://pmg5pvkkxy4uiuwf57g7b2atny0xmjyt.lambda-url.us-east-2.on.aws/';


async function runChat(prompt) {
  try {
    const response = await axios.post(LAMBDA_FUNCTION_URL, {
      user_input: prompt,
    });

    // Assuming the Lambda function returns the response directly
    const { data } = response;
    console.log(data); // Log the response

    return data; // Return the data
  } catch (error) {
    console.error('Error communicating with the API:', error);
    const { data } = "CANT HELP";
    return data;
  }
}

export default runChat;
