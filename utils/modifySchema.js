const fs = require('fs');

const fetchMultis = require('./fetchMultis');
const filterMultis = require('./filterMultis');

const schema = require('./schema.json');

// const filteredMultis = [
//   {
//     name: 'gg',
//     subreddits: ['g1', 'g2']
//   },
//   {
//     name: 'ww',
//     subreddits: ['w1', 'w2', 'w3']
//   },
//   {
//     name: 'ss',
//     subreddits: ['s1', 's2', 's3']
//   }
// ];

// const multisNames = ['gg', 'ss'];

// console.log(getSubreddits(filteredMultis, multisNames));

const getSubreddits = (filteredMultis, multisNames) => {
  let subreddits = [];
  filteredMultis.map((filteredMulti) => {
    if (multisNames.includes(filteredMulti.name)) {
      subreddits = [...subreddits, ...filteredMulti.subreddits];
    }
  });
  subreddits = [...new Set(subreddits)];
  return subreddits;
};

const createNewSchema = async (schema) => {
  const multis = await fetchMultis();
  const filteredMultis = filterMultis(multis);

  const newSchema = schema.map((s) => {
    return { ...s, subreddits: getSubreddits(filteredMultis, s.multisNames) };
  });
  // console.log(newSchema);
  return newSchema;
};

const modifySchema = (newSchema) => {
  let data = JSON.stringify(newSchema);
  fs.writeFileSync('./utils/schema.json', data);
  console.log('New Schema created at schema.json');
};

createNewSchema(schema).then((res) => modifySchema(res));
