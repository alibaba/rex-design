function template({ template }, opts, { imports, componentName, props, jsx, exports }) {
  return template.ast`
    ${imports}
    const ${componentName} = (${props}) => ${jsx}
    ${exports}
  `;
}
module.exports = template;
