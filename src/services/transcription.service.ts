import TranscriptionModel from '../models/transcription.model';
import { downloadAudio } from '../utils/download.util';
import dotenv from 'dotenv';
import logger from '../utils/logger';
import fs from 'fs'
dotenv.config()

export const handleTranscription = async (audioUrl: string): Promise<string> => {
  try {
    logger.info(`Starting transcription for audioUrl: ${audioUrl}`);
    const filePath = await downloadAudio(audioUrl);

    // Transcription From audio to text logic

    const transcriptionText = 'transcribed text'

    const doc = await TranscriptionModel.create({
      audioUrl,
      transcription: transcriptionText,
    });

    fs.unlinkSync(filePath);
    logger.info(`Transcription saved successfully. ID: ${doc._id}`);
    return doc._id.toString();
  } catch (error) {
    console.log("error in handleTranscription", error)
    return ""
  }

};

export const getTranscriptionById = async (id: string) => {
  try {
    logger.info(`Fetching transcription by ID: ${id}`);
    const transcription = await TranscriptionModel.findById(id);
    if (!transcription) {
      logger.warn(`No transcription found with ID: ${id}`);
    }
    return transcription;
  } catch (error) {
    logger.error(`Error fetching transcription by ID: ${error}`);
    return null;
  }
};

export const getAllTranscriptions = async () => {
  try {
    logger.info('Fetching all transcriptions');
    return await TranscriptionModel.find();
  } catch (error) {
    logger.error(`Error fetching all transcriptions: ${error}`);
    return [];
  }
};

export const deleteTranscriptionById = async (id: string): Promise<boolean> => {
  try {
    logger.info(`Deleting transcription by ID: ${id}`);
    const result = await TranscriptionModel.findByIdAndDelete(id);
    if (result) {
      logger.info(`Transcription deleted successfully. ID: ${id}`);
      return true;
    } else {
      logger.warn(`Transcription not found for deletion. ID: ${id}`);
      return false;
    }
  } catch (error) {
    logger.error(`Error deleting transcription: ${error}`);
    return false;
  }
};