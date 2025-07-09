

const generateUniqueUsername = (username) => {
    // Remove spaces and convert to lowercase
    const baseUsername = username.toLowerCase().replace(/\s+/g, '');
    // Generate a random 4-digit suffix
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    // Combine base username with random suffix
    const uniqueUsername = `@${baseUsername}_${randomSuffix}`;
    
    return uniqueUsername;
};
  

export default generateUniqueUsername;