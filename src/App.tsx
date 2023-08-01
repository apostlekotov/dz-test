import { searchObjects } from './api/object';
import { useEffect, useState } from 'react';
import { ArtObjectComponent } from './api/ArtObjectComponent';
import { useDebouncedValue } from './use-debounced-value';

function App() {
  const [query, setQuery] = useState<string>('');
  const [debounced] = useDebouncedValue(query, 200);

  const [objectIDs, setObjectIDs] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const isError = !!error;

  useEffect(() => {
    try {
      setIsLoading(true);
      const data = searchObjects(debounced);
      data.then((data) => {
        setObjectIDs(data.objectIDs);
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return setError(error);
      setError(new Error('Failed to search objects'));
    } finally {
      setIsLoading(false);
    }
  }, [debounced]);

  return (
    <div className='p-40'>
      <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} className='border border-gray-400 w-full' />

      {isLoading && <div>Loading...</div>}

      {isError && <div>Error</div>}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-5 gap-y-[3.75rem]'>
        {objectIDs?.map((object) => (
          <ArtObjectComponent key={object} id={object} />
        ))}
      </div>
    </div>
  );
}

export default App;
