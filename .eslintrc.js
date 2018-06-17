module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8,
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "linebreak-style": 0,
        "indent": [
            2,
            2,
            {
                "SwitchCase": 1
            }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-param-reassign": 0,
        "semi": [
            "error",
            "never"
        ]
    }
};