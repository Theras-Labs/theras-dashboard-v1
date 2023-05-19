export function setCacheData(key, data, expiredHour = 1) {
  var expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + expiredHour * 60 * 60 * 1000);
  var cacheItem = {
    data: data,
    expiry: expiryDate.getTime(),
  };
  localStorage.setItem(key, JSON.stringify(cacheItem));
}

export function retrieveCacheData(key) {
  var cacheItem = localStorage.getItem(key);
  if (cacheItem) {
    var parsedCacheItem = JSON.parse(cacheItem);
    var currentTime = new Date().getTime();
    if (parsedCacheItem.expiry > currentTime) {
      return parsedCacheItem.data;
    } else {
      localStorage.removeItem(key); // Remove expired cache item
    }
  }
  return null; // Cache item not found or expired
}
