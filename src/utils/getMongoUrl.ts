interface IMongoConnectionURL {
  user: string;
  password: string;
  name: string;
}

const env = process.env;

export default function getMongoUrl(url: string, params: IMongoConnectionURL) {
  Object.values(params).forEach((value) => {
    url = url.replace('${}', `${value}`);
  });
  return url;
}

// is a currying?
export const mongoUrlWithParams = () =>
  getMongoUrl(env.DATABASE_URL, {
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    name: env.DATABASE_NAME,
  });
