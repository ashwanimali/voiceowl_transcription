import express from 'express';
import transcriptionRoutes from './routes/transcription.routes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/transcription', transcriptionRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
