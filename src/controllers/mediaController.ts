
import { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import axios from 'axios';
import { MediaModel } from '../models/media.model';

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 30 * 1024 * 1024 } }); // 30mb

/* The `uploadMedia` function is responsible for handling the upload of media files. */
export const uploadMedia = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {

      if (!req.body.userId) {
        return res.status(400).send('Provide userId from login');
      }

      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }

      if (req.file.mimetype.indexOf('video/') !== 0) {
        return res.status(400).send('Invalid file type. Please upload a video.');
      }


      //Upload to cloudinary server
      cloudinary.v2.uploader.upload_stream({ resource_type: 'auto' }, async (error: any, result: any) => {
        if (error) {
          return res.status(500).send('Upload failed');
        }

        let newMedia = await MediaModel.create({
          url: result.secure_url,
          format: result.format,
          publicId: result.public_id,
          playbackUrl: result.playback_url,
          userId: req.body.userId,
          duration: result.duration,
          fileSize: result.bytes,
        });

        const response = {
          status: 'success',
          message: 'Media uploaded successfully',
          data: newMedia,
        };

        res.json(response);
      }).end(req.file.buffer);
    } catch (err) {
      console.error(err);
      res.status(500).send({ status: 'Server error', error: (err as Error).message });
    }
  },
];

/**
 * The function fetches a media file from a Cloudinary URL and streams a partial content of the file to
 * the client based on the requested range.
 */
export const fetchMedia = async (req: Request, res: Response) => {
  const { mediaId } = req.params;

  try {
    const media = await MediaModel.findById(mediaId);

    if (!media) {
      return res.status(404).json({ message: 'Media not found!' });
    }

    const cloudinaryUrl = media.url;
    const range = req.headers.range || "bytes=0-";

    /* Information about the media file stored on Cloudinary and setting up the necessary parameters for streaming a partial content of the media file to the client. */
    const headResponse = await axios.head(cloudinaryUrl);
    const totalLength = parseInt(headResponse.headers['content-length'], 10);
    const contentType = headResponse.headers['content-type'].split(';')[0]
    const chunkSize = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, totalLength - 1);

    // Calculate the content length for this chunk
    const contentLength = (end - start) + 1;

    //Stream media to client via pipe
    const response = await axios.get(cloudinaryUrl, {
      responseType: 'stream',
      headers: { Range: `bytes=${start}-${end}` }
    });

    // Set headers for partial content
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${totalLength}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': contentType
    });

    response.data.pipe(res).on('error', (err: Error) => {
      res.status(500).send(err.message);
    });

  } catch (error) {
    console.error('Error fetching video:', (error as Error).message);
    res.status(500).send('Internal Server Error');
  }
};


