import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const downloadAudio = async (url: string, retries = 3, delay = 1000): Promise<string> => {
  const tmpDir = path.join(__dirname, '../tmp');

  // Ensure tmp directory exists
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const fileName = `${uuid()}.mp3`;
  const filePath = path.join(tmpDir, fileName);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const writer = fs.createWriteStream(filePath);
      const response = await axios({ url, method: 'GET', responseType: 'stream' });

      response.data.pipe(writer);

      return await new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(filePath));
        writer.on('error', reject);
      });
    } catch (error: any) {
      console.error(`Download attempt ${attempt} failed:`, error.message);

      // Delete partially downloaded file if it exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      if (attempt < retries) {
        console.log(`Retrying in ${delay}ms...`);
        await sleep(delay);
      } else {
        throw new Error(`Download failed after ${retries} attempts.`);
      }
    }
  }

  throw new Error('Unexpected error in downloadAudio'); // Fallback (should never reach here)
};
