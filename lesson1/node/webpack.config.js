module.exports = {
  mode: 'production',
  entry: './src/app',
  output: {
    filename: './app.js',
  },

  resolve: {
    alias: {
      components: './components',
    },
  },
};
