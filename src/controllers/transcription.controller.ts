import { Request, Response } from 'express';
import { TranscriptionRequest } from '../types/transcription.types';
import { deleteTranscriptionById, getAllTranscriptions, getTranscriptionById, handleTranscription } from '../services/transcription.service';

export const createTranscription = async (req: Request, res: Response) => {
  try {
    const { audioUrl }: TranscriptionRequest = req.body;

    if (!audioUrl) {
      return res.status(400).json({ error: 'audioUrl is required' });
    }

    const id = await handleTranscription(audioUrl);
    res.status(201).json({ _id: id });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};


export const getSingleTranscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transcription = await getTranscriptionById(id);

    if (!transcription) {
      return res.status(404).json({ error: 'Transcription not found' });
    }

    res.status(200).json(transcription);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllTranscriptionsHandler = async (req: Request, res: Response) => {
  try {
    const transcriptions = await getAllTranscriptions();
    res.status(200).json(transcriptions);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const deleteTranscriptionHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await deleteTranscriptionById(id);

    if (!success) {
      return res.status(404).json({ error: 'Transcription not found' });
    }

    res.status(200).json({ message: 'Transcription deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};