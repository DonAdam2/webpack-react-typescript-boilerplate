/* eslint-disable @typescript-eslint/no-require-imports */

const path = require('path'),
  camel = require('to-camel-case');

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const pascalCaseFilename = camel(path.parse(filename).name),
        componentName = `Svg${pascalCaseFilename}`;

      return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
         ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${assetFilename}
            })
          };
        }),
      };`;
    }

    return { code: `module.exports = ${assetFilename};` };
  },
};
