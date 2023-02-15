// Immediately export a function that generates a string of random numbers and letters
// uses the Date.now epoc to ensure all id's are unique
module.exports = () => Date.now().toString(16);

