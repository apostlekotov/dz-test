import { getObjectById } from './object';
import { useEffect, useState } from 'react';
import { ArtObject } from './object/type';

interface ArtObjectProps {
  id: number;
}

export const ArtObjectComponent: React.FC<ArtObjectProps> = ({ id }) => {
  const [artObject, setArtObject] = useState<ArtObject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const isError = !!error;

  useEffect(() => {
    if (!id) return;

    try {
      setIsLoading(true);
      const data = getObjectById(id);
      data.then((data) => {
        setArtObject(data);
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return setError(error);
      setError(new Error('Failed to get object'));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!artObject) {
    return null;
  }

  return (
    <div className='mb-auto'>
      <img src={artObject.primaryImageSmall} alt={artObject.title} />
      <span className='font-medium'>{artObject.name}</span>
    </div>
  );
};
