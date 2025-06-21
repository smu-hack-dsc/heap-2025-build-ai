import axios from "axios"

export const geminiChatCompletion = async (message) => {
  try {
    // Exercise 3 part 2
    // make a POST request to your backend’s /api/v1/gemini-chat endpoint using axios.post
    // Send the user’s message as the request body under userPrompt.
    // Set the Content-Type header to application/json
    // TODO
    // const response = await axios.post(
    //   `${import.meta.env.VITE_API_URL}/api/v1/gemini-chat`,
    //   {
    //     userPrompt: message
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // );
    // console.log(response.data);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/gemini-chat`,
      {
        userPrompt: message
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching issues', error);
  }
};