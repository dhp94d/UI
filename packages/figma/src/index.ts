import { fetchFigmaNodesByFileName } from './api/index'; // 실제 파일 경로에 맞게 조정
import { writeFile } from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { FoundationType } from '../type';

console.log(import.meta.url);
// __filename 및 __dirname 정의 (ESM에서 사용)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function saveFigmaDataToFile(fileName: FoundationType): Promise<void> {
  try {
    // fetchFigmaNodesByFileName의 반환 타입을 명시합니다.
    const data: unknown = await fetchFigmaNodesByFileName(fileName);
    console.log(data);
    const jsonData: string = JSON.stringify(data, null, 2); // 데이터 포맷

    // 파일 경로 설정
    const filePath: string = path.join(__dirname, `${fileName}.json`);

    console.log(filePath);
    // 파일 쓰기
    await writeFile(filePath, jsonData, 'utf8');
    console.log(`Data saved to ${filePath}`);
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
}

// 함수 실행 예제
saveFigmaDataToFile('layout');
