import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LazyImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: '#f0f0f0', 
              position: 'absolute', 
              top: 0, 
              left: 0,
              zIndex: 1,
              borderRadius: 'inherit'
            }}
          />
        )}
      </AnimatePresence>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </>
  );
};

export default LazyImage;
