module.exports = {
  extends: ['./src/base.js'],
  overrides: [
    {
      files: ['src/*.js'],
      rules: {
        'import/no-commonjs': 'off',
      },
    },
  ],
}
