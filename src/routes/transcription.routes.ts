import { Router } from 'express';
import { createTranscription, deleteTranscriptionHandler, getAllTranscriptionsHandler, getSingleTranscription } from '../controllers/transcription.controller';

const router = Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Transcription:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64d7b5f34c1fc6249c7d4e3f
 *         audioUrl:
 *           type: string
 *           example: https://example.com/audio.mp3
 *         transcription:
 *           type: string
 *           example: This is the transcribed text
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-07T12:30:00.000Z
 *     TranscriptionRequest:
 *       type: object
 *       required:
 *         - audioUrl
 *       properties:
 *         audioUrl:
 *           type: string
 *           example: https://example.com/audio.mp3
 */

/**
 * @swagger
 * /transcription:
 *   post:
 *     summary: Create transcription from audio URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TranscriptionRequest'
 *     responses:
 *       201:
 *         description: Transcription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64d7b5f34c1fc6249c7d4e3f
 *       400:
 *         description: audioUrl is required
 *       500:
 *         description: Something went wrong
 */
router.post('/', createTranscription);

/**
 * @swagger
 * /transcription/all:
 *   get:
 *     summary: Get all transcriptions
 *     responses:
 *       200:
 *         description: A list of transcriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transcription'
 */

router.get('/all', getAllTranscriptionsHandler);

/**
 * @swagger
 * /transcription/{id}:
 *   get:
 *     summary: Get a single transcription by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A transcription object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transcription'
 *       404:
 *         description: Transcription not found
 */

router.get('/:id', getSingleTranscription);

/**
 * @swagger
 * /transcription/{id}:
 *   delete:
 *     summary: Delete a transcription by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transcription deleted
 *       404:
 *         description: Transcription not found
 */


router.delete('/:id', deleteTranscriptionHandler);


export default router;
