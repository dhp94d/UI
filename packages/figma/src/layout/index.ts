import { fetchFigmaNodesByFileName } from '@figma/src/api/index';
import { dfsGenerator } from '@figma/src/utils';

export const getLayoutCssClassList = async () => {
  const result = [];
  const layoutNode = (await fetchFigmaNodesByFileName('layout')).nodes;

  const generator = dfsGenerator(layoutNode);

  for (const node of generator) {
    if (node.type === 'FRAME' && node.name.includes('spacing_')) {
      if (node.children[0].type === 'FRAME' && node.children[0].children[0].type === 'RECTANGLE') {
        const targetNode = node.children[0].children[0];
        result.push(`--layout-${node.name.replace('_', '-')}: ${targetNode.absoluteBoundingBox?.height}px;`);
      }
    }
  }
  const radius = ['default', 'half', 'full'].map((type, index) => {
    return `--layout-radius-${type}: ${Math.pow(2, index + 2)}px;`;
  });

  return [...result, ...radius];
};
