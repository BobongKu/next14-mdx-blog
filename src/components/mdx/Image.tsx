interface ImageProps {
  src: string;
  alt: string;
}

export const Image = ({ src, alt }: ImageProps) => {
  return (
    <>
      <img src={src} alt={alt} className='mx-auto mb-0 !mt-4 rounded-md border-2 border-gray-500'/>
      {alt !== '' && (
        <span className='mb-8 block w-full text-center text-sm text-gray-500 dark:text-gray-400'>
          {alt}
        </span>
      )}
    </>
  );
};
