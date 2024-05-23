import { GetFileNodesResponse, Node } from '@figma/rest-api-spec';

type StylesType = GetFileNodesResponse['nodes']['string']['styles'];

export interface TargetTypeData {
  [key: string]: {
    name: string;
  };
}

//#region dfs node

/** dfs - 타입 가드 함수 정의 */
function hasChildren(node: Node): node is Node & { children: Node[] } {
  return (node as Node & { children: Node[] }).children !== undefined;
}

/** dfs - node 탐색 */
function* traverseNode(node: Node): Generator<Node> {
  yield node;
  if (hasChildren(node)) {
    for (const child of node.children) {
      yield* traverseNode(child);
    }
  }
}

/** dfs - 로직 */
export function* dfsGenerator(nodes: GetFileNodesResponse['nodes']): Generator<Node> {
  for (const key in nodes) {
    const node = nodes[key].document;
    yield* traverseNode(node);
  }
}

/** type=target인 style객체 생성  */
export const getTextStyleObj = <T>(styles: StylesType, type: StylesType['string']['styleType']): TargetTypeData => {
  return Object.keys(styles).reduce((acc, styleKey) => {
    const style = styles[styleKey];
    if (style.styleType === type) {
      acc[styleKey] = {
        name: style.name,
      };
    }
    return acc;
  }, {} as TargetTypeData);
};
//#endregion

//#region 기능

/** 케밥케이스로 변경 */
export const camelToKebabCase = (str: string) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};
