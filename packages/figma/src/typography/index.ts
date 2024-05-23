import { fetchFigmaNodesByFileName } from '@figma/src/api/index';
import { dfsGenerator, getTextStyleObj, type TargetTypeData } from '@figma/src/utils';

interface TypoStyle {
  fontSize: string;
  fontWeight: string;
  fontStyle: 'normal';
  lineHeight: string;
  letterSpacing: string;
}

const getTypographyCssClassList = async () => {
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
        `.${typoList[node.styles.text].name.replaceAll('/', '_')} {
          font-size: ${fontSize}px;
          font-weight: ${fontWeight};
          font-style: normal;
          line-height: ${lineHeightPercentFontSize}%;
          letter-spacing: ${letterSpacing}px;
      }`,
      );
    }
  }
  console.log([...new Set(result)]);
};

getTypographyCssClassList();
