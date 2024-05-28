import { fetchFigmaNodesByFileName } from '@figma/src/api/index';
import { dfsGenerator } from '@figma/src/utils';

// const unUsedIconNames = ['icon/icons', 'icon/normal/!Blank', 'icon/icons Responsive'];

// const defaultType = {
//   size: '16px,20px,24px,32px',
//   color: 'string',
// };

// export const getLayoutCssClassList = async () => {
//   const result = [];
//   const iconNode = (await fetchFigmaNodesByFileName('icon')).nodes;

//   const generator = dfsGenerator(iconNode);

//   for (const node of generator) {
//     if (node.type === 'COMPONENT_SET' && !unUsedIconNames.includes(node.name)) {
//       const temp: any = {
//         name: node.name,
//       };
//       for (const property in node.componentPropertyDefinitions) {
//         if (property === 'name') continue;
//         const propertyObj = node.componentPropertyDefinitions[property];
//         temp['property'] = { name: property, ...propertyObj };
//       }
//     }
//   }
// };

import fs from 'fs';

const extractSvgFromJson = (node: any): string => {
  if (node.type !== 'VECTOR') {
    throw new Error('Provided node is not a VECTOR type');
  }

  const {
    absoluteBoundingBox: { width, height },
    fills,
    pathData,
  } = node;

  const fillColor = fills[0]?.color
    ? `rgba(${Math.round(fills[0].color.r * 255)}, ${Math.round(fills[0].color.g * 255)}, ${Math.round(
        fills[0].color.b * 255,
      )}, ${fills[0].color.a})`
    : 'none';

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
      <path d="${pathData}" fill="${fillColor}" />
    </svg>
  `;
};

const generateSvgFiles = (json: any) => {
  const components = json.children.filter((child: any) => child.type === 'COMPONENT');
  components.forEach((component: any) => {
    const vectorNode = component.children.find((child: any) => child.type === 'VECTOR');
    if (vectorNode) {
      const svgContent = extractSvgFromJson(vectorNode);
      const fileName = `${component.name.replace(/[\s=,]/g, '_')}.svg`;
      fs.writeFileSync(`dist/${fileName}`, svgContent);
      console.log(`Generated SVG: dist/${fileName}`);
    }
  });
};

const jsonData = {
  id: '6908:942',
  name: 'icon/normal/send',
  type: 'COMPONENT_SET',
  scrollBehavior: 'SCROLLS',
  componentPropertyDefinitions: {
    name: {
      type: 'VARIANT',
      defaultValue: 'send',
      variantOptions: ['send'],
    },
  },
  blendMode: 'PASS_THROUGH',
  children: [
    {
      id: '6863:65541',
      name: 'name=send',
      type: 'COMPONENT',
      scrollBehavior: 'SCROLLS',
      blendMode: 'PASS_THROUGH',
      children: [
        {
          id: '6863:65542',
          name: 'shape',
          type: 'VECTOR',
          scrollBehavior: 'SCROLLS',
          blendMode: 'PASS_THROUGH',
          absoluteBoundingBox: {
            x: -2942.873046875,
            y: -2307.809814453125,
            width: 17.76577377319336,
            height: 17.61966323852539,
          },
          absoluteRenderBounds: {
            x: -2942.873046875,
            y: -2307.809814453125,
            width: 17.765869140625,
            height: 17.61962890625,
          },
          constraints: {
            vertical: 'SCALE',
            horizontal: 'SCALE',
          },
          fills: [
            {
              blendMode: 'NORMAL',
              type: 'SOLID',
              color: {
                r: 0.07083333283662796,
                g: 0.07083333283662796,
                b: 0.07083333283662796,
                a: 1,
              },
            },
          ],
          strokes: [],
          strokeWeight: 1.799999713897705,
          strokeAlign: 'CENTER',
          strokeJoin: 'BEVEL',
          styles: {
            fill: '2735:3844',
          },
          effects: [],
        },
      ],
      absoluteBoundingBox: {
        x: -2946,
        y: -2311,
        width: 23.999998092651367,
        height: 23.999998092651367,
      },
      absoluteRenderBounds: {
        x: -2946,
        y: -2311,
        width: 24,
        height: 24,
      },
      preserveRatio: true,
      constraints: {
        vertical: 'SCALE',
        horizontal: 'SCALE',
      },
      clipsContent: true,
      background: [],
      fills: [],
      strokes: [],
      strokeWeight: 0.19999997317790985,
      strokeAlign: 'INSIDE',
      backgroundColor: {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      },
      effects: [],
    },
  ],
  absoluteBoundingBox: {
    x: -2962,
    y: -2327,
    width: 56,
    height: 56,
  },
  absoluteRenderBounds: {
    x: -2962,
    y: -2327,
    width: 56,
    height: 56,
  },
  constraints: {
    vertical: 'TOP',
    horizontal: 'LEFT',
  },
  layoutAlign: 'INHERIT',
  layoutGrow: 0,
  layoutSizingHorizontal: 'FIXED',
  layoutSizingVertical: 'FIXED',
  clipsContent: true,
  background: [],
  fills: [],
  strokes: [
    {
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: {
        r: 0.5921568870544434,
        g: 0.27843138575553894,
        b: 1,
        a: 1,
      },
    },
  ],
  cornerRadius: 5,
  cornerSmoothing: 0,
  strokeWeight: 1,
  strokeAlign: 'INSIDE',
  backgroundColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  },
  strokeDashes: [10, 5],
  effects: [],
};

generateSvgFiles(jsonData);

const generateVueComponent = () => {
  return `
<template>
	<div>{{ tag }}</div>
</template>

<script setup lang="ts">
export interface Props {
	size: '16px' | '20px' | '24px' | '32px';
  color: string;
}

const props = withDefaults(defineProps<Props>(), {
	size: '16px',
	color: getCssVariable('--color-base-static-black'),
});

</script>
<stlye>
</stlye>

`;
};
// getLayoutCssClassList();
