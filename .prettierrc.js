module.exports = {
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '.prettierrc.js', '.eslintrc.js'],
      options: {
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
      },
    },
  ],
};
