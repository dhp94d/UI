import { FoundationType } from '@figma/type';
import * as dotenv from 'dotenv';
import type { GetFileNodesResponse } from '@figma/rest-api-spec';

dotenv.config();

const getFoundationId = (type: FoundationType): string => {
  switch (type) {
    case 'color':
      return process.env.FIGMA_COLOR_ID!;
    case 'elevation':
      return process.env.FIGMA_ELEVATION_ID!;
    case 'icon':
      return process.env.FIGMA_ICON_ID!;
    case 'layout':
      return process.env.FIGMA_LAYOUT_ID!;
    case 'logo':
      return process.env.FIGMA_LOGO_ID!;
    case 'typography':
      return process.env.FIGMA_TYPOGRAPHY_ID!;
    default:
      throw new Error(`Unknown foundation type: ${type}`);
  }
};

const FETCH_OPTION = {
  method: 'GET',
  headers: {
    'X-Figma-Token': process.env.FIGMA_TOKEN as string,
  },
} as const;

const ENV = process.env;

const apiRequest = async <T>(fileName: FoundationType): Promise<T> => {
  const option = FETCH_OPTION;
  const url = `${ENV.FIGMA_GET_ENDPOINT}/${ENV.FIGMA_FILENAME}/nodes?ids=${getFoundationId(fileName)}`;

  const response = await fetch(url, option);

  if (!response.ok) {
    throw new Error('Error plz check api');
  }
  return await response.json();
};

export const fetchFigmaNodesByFileName = async (fileName: FoundationType): Promise<GetFileNodesResponse> => {
  return await apiRequest<GetFileNodesResponse>(fileName);
};
