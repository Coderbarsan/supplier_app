import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-news-content.ts';
import '@/ai/flows/detect-bias-in-content.ts';
import '@/ai/flows/assign-credibility-score.ts';