import express from 'express';
import qualificationRoutes from './routes/qualificationRoutes';
import errorHandler from './middlewares/errorHandler';
import validateGlobalUrl from './middlewares/globalUrl';

const app = express();

app.use(express.json());
app.use(validateGlobalUrl);
app.use('/api', qualificationRoutes);
app.use(errorHandler);

export default app;
