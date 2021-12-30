module.exports = {
  presets: [
    ['@babel/preset-env', {
        targets: { node: 'current' }
      }
    ],
    '@babel/preset-typescript', 
    ["react-app", { "flow": false, "typescript": true }]
  ],
};