import { fetchFigmaNodesByFileName } from '@figma/src/api/index';
import { dfsGenerator, getTextStyleObj, type TargetTypeData } from '@figma/src/utils';

export const getTypographyCssClassList = async () => {
  const result = [];

  const typoNode = (await fetchFigmaNodesByFileName('typography')).nodes;

  const typoList = Object.keys(typoNode).reduce((acc, nodeKey) => {
    return { ...acc, ...getTextStyleObj(typoNode[nodeKey].styles, 'TEXT') };
  }, {} as TargetTypeData);

  const typoKeyList = Object.keys(typoList);

  const generator = dfsGenerator(typoNode);
  for (const node of generator) {
    if (node.type === 'TEXT' && node.styles && typoKeyList.includes(node.styles.text ?? '')) {
      const { fontSize, fontWeight, lineHeightPercentFontSize, letterSpacing } = node.style;

      result.push(
        `.typo-${typoList[node.styles.text].name
          .replaceAll('/', '-')
          .replaceAll(
            '_',
            '-',
          )} {\nfont-size: ${fontSize}px;\nfont-weight: ${fontWeight};\nfont-style: normal;\nline-height: ${lineHeightPercentFontSize}%;\nletter-spacing: ${letterSpacing}px;\n}`,
      );
    }
  }
  return [...new Set(result)];
};
