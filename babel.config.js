const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
})();

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: hasJsxRuntime ? 'automatic' : 'classic' }],
      '@babel/preset-typescript',
    ],
    plugins = [
      '@babel/plugin-transform-runtime',
      'babel-plugin-macros',
      // Applies the react-refresh Babel plugin on non-production modes only
      ...(api.env() === 'development' ? ['react-refresh/babel'] : []),
    ];

  return {
    presets,
    plugins,
  };
};
