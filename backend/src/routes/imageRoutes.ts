import { Router } from 'express';
import multer from 'multer';
import { uploadImageToS3 } from '../services/s3Service';
import ExerciseImage from '../models/ExerciseImage';
import authMiddleware from '../middlewares/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });

    const s3Key = await uploadImageToS3(req.file, req.user.id);

    const newImage = new ExerciseImage({
      name: req.body.name,
      s3Key,
      uploaderId: req.user.id,
      permissions: {
        public: req.body.public === 'true',
        allowedUsers: req.body.allowedUsers || []
      }
    });

    await newImage.save();

    res.status(201).json({
      _id: newImage._id,
      name: newImage.name,
      createdAt: newImage.createdAt
      // Nunca retornar o s3Key para o frontend
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

router.get('/:id', authMiddleware, getImage);

export default router;