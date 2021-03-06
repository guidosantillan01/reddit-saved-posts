/*
 * categories @string
 * SCHEMA @array
 * Each element contains "title" @string, "multisNames" @array, "subreddits" @array
 *
 */

const filterSubreddits = ({ categories = '', SCHEMA = [] } = {}) => {
  console.log('Getting subreddits...');

  let subreddits = [];
  SCHEMA.map((s) => {
    if (categories === s.title) {
      subreddits = [...s.subreddits];
    }
  });
  return subreddits;
};

module.exports = filterSubreddits;
