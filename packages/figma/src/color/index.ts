import { fetchFigmaNodesByFileName } from '@figma/src/api/index';
import { dfsGenerator, getTextStyleObj, type TargetTypeData } from '@figma/src/utils';

const rgbaToHex = (r: number, g: number, b: number, a: number): string => {
  const toHex = (value: number): string => {
    const hex = Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');
    return hex.toUpperCase();
  };

  const alpha = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`;
};

const getElevationCssClassList = async () => {
  const result = [];
  const colorNode = (await fetchFigmaNodesByFileName('color')).nodes;

  let colorList = Object.keys(colorNode).reduce((acc, nodeKey) => {
    return { ...acc, ...getTextStyleObj(colorNode[nodeKey].styles, 'FILL') };
  }, {} as TargetTypeData);
  const colorKeyList = Object.keys(colorList);

  const generator = dfsGenerator(colorNode);

  for (const node of generator) {
    if (node.type === 'RECTANGLE' && node.styles && colorKeyList.includes(node.styles.fill ?? '')) {
      const fills = node.fills[0];
      if (fills && fills.type === 'SOLID') {
        const { r, g, b, a } = fills.color;
        const color = rgbaToHex(r, g, b, a);
        result.push(`--color-${colorList[node.styles.fill].name.replaceAll('/', '-')}: ${color};`);
      }
    }
  }

  console.log([...new Set(result)]);
};

getElevationCssClassList();
