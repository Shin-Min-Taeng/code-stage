import 'dotenv/config';

const getValue = (key: string): any => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`${key}가 정의되지 않았습니다`);
  }

  return value;
};

export const DATABASE = {
  HOST: getValue('DB_HOST'),
  PORT: getValue('DB_PORT'),
  USERNAME: getValue('DB_USERNAME'),
  PASSWORD: getValue('DB_PASSWORD'),
  DATABASE: getValue('DB_NAME'),
};

const config = {
  DATABASE,
};

export default config;
