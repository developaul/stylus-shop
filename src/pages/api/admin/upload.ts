import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, File } from 'formidable'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

type Data =
  | { message: string }

export const config = {
  api: { bodyParser: false }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'POST':
        return uploadFile(req, res)

      default:
        return res.status(400).json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error uploadFile:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

const saveFile = async (file: File): Promise<string> => {
  const { secure_url } = await cloudinary.uploader.upload(file.filepath, { folder: 'stylus-shop' })
  return secure_url
}

const parseFiles = async (req: NextApiRequest): Promise<string> => {

  const form = new IncomingForm()

  const [_, files] = await form.parse(req)

  return saveFile(files.file![0] as File)
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const imageUrl = await parseFiles(req)

  return res.status(200).json({ message: imageUrl })
}
