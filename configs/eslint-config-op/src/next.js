module.exports = {
  extends: ['./base.js', 'next/core-web-vitals'],
  overrides: [
    {
      files: [
        'src/app/api/**/*route.ts',
        'src/app/**/*layout.tsx',
        'src/app/**/*page.tsx',
        'next.config.js',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
}
