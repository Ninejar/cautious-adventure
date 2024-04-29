module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV);
  const isTest = api.env('test');
  return {
    presets: [
      ['@babel/preset-env', {
        targets: { node: 'current' },
        modules: isTest ? 'commonjs' : false // Transform ES Modules to CommonJS only in test environment
      }],
      '@babel/preset-react'
    ]
  };
};