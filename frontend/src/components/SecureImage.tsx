import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface SecureImageProps {
  imageId: string;
  className?: string;
  alt: string;
}

const SecureImage: React.FC<SecureImageProps> = ({ imageId, className, alt }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await api.get(`/images/${imageId}`, {
          responseType: 'blob' // Para o modo proxy
        });
        
        const objectUrl = URL.createObjectURL(response.data);
        setImageUrl(objectUrl);

        // Alternativa para redirecionamento:
        // setImageUrl(response.request.responseURL);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    fetchImage();

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageId]);

  return imageUrl ? (
    <img 
      src={imageUrl} 
      alt={alt}
      className={className}
      onError={() => setImageUrl('/placeholder-image.jpg')}
    />
  ) : (
    <div className={`${className} bg-gray-200 animate-pulse`} />
  );
};

export default SecureImage;