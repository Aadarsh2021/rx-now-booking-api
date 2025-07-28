// Simple in-memory cache
const cache = new Map();

// Cache middleware
const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse && Date.now() - cachedResponse.timestamp < duration * 1000) {
      return res.json(cachedResponse.data);
    }

    // Store original send method
    const originalSend = res.json;

    // Override send method to cache the response
    res.json = function(data) {
      cache.set(key, {
        data: data,
        timestamp: Date.now()
      });
      
      // Call original send method
      return originalSend.call(this, data);
    };

    next();
  };
};

// Clear cache
const clearCache = () => {
  cache.clear();
};

// Get cache stats
const getCacheStats = () => {
  return {
    size: cache.size,
    keys: Array.from(cache.keys())
  };
};

module.exports = {
  cacheMiddleware,
  clearCache,
  getCacheStats
}; 