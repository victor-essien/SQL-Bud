import express from 'express';
import cors from 'cors';
import reviewRoutes from '../routes/review';



const app = express();
app.use(cors());
app.use(express.json());

// Use the review route
 app.use('/api', reviewRoutes);

const PORT =  8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;