import { Request, Response } from 'express';
import ExerciseImage from '../models/ExerciseImage';
import { getSignedImageUrl } from '../services/s3Service';

export const getImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id; // Supondo autenticação JWT

    const image = await ExerciseImage.findById(id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    // Verificação de permissão
    if (!image.permissions.public && 
        !image.permissions.allowedUsers?.includes(userId) && 
        image.uploaderId.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const cdnUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/${image.s3Key}`;
    res.redirect(301, cdnUrl);
    // Opção 1: Redirecionamento
    // return res.redirect(signedUrl);

    // Opção 2: Proxy (mais seguro)
    const response = await fetch(signedUrl);
    const imageBuffer = await response.arrayBuffer();

    res.set('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
    res.send(Buffer.from(imageBuffer));

  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
};