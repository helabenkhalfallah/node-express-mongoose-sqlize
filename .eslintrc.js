module.exports = {
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 8,
  },
  'extends': 'google',
  'rules': {
    'max-len': ['error', {
      'ignoreComments': true,
      'code': 120,
    }],
  },
};
