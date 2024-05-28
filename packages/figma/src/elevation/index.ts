import { fetchFigmaNodesByFileName } from '@figma/src/api/index';
import type { DropShadowEffect } from '@figma/rest-api-spec';
import { dfsGenerator } from '@figma/src/utils';

const getDropShadowStr = (effect: DropShadowEffect) => {
  const {
    offset: { x, y },
    radius,
    spread = 0,
    color: { r, g, b, a },
  } = effect;
  return `${x}px ${y}px ${radius}px ${spread}px rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a.toFixed(2)})`;
};

export const getElevationCssClassList = async () => {
  const elevationList = [];
  const elevationNode = (await fetchFigmaNodesByFileName('elevation')).nodes;
  const generator = dfsGenerator(elevationNode);

  for (const node of generator) {
    if (node.type === 'RECTANGLE' && /^Elevation \d+$/.test(node.name)) {
      const boxShadowStr = node.effects.reduce((acc, cur) => {
        const dropShadowStr = cur.type === 'DROP_SHADOW' ? getDropShadowStr(cur) : '';
        return `${acc} ${dropShadowStr}`;
      }, '');

      const elevationClass = `.${node.name.replace(' ', '-').toLowerCase()} {\nbox-shadow: ${boxShadowStr};\n}`;
      elevationList.push(elevationClass);
    }
  }
  return elevationList;
};
