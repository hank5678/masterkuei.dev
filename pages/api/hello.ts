// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import { Configuration, OpenAIApi } from "openai"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(process.env.OPENAI_API_KEY)
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    })
    const openai = new OpenAIApi(configuration)

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
      temperature: 0.6
    })

    // console.log(completion.data.choices[0].text)

    res.status(200).json({ name: "John Doe" })
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: "An error occurred during your request."
        }
      })
    }
  }
}
