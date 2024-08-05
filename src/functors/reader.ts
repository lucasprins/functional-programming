import { id } from "../core";

type Reader<R, A> = (r: R) => A;

const map = <R, A, B>(fa: Reader<R, A>, f: (a: A) => B): Reader<R, B> => {
  return (r: R) => f(fa(r));
};

const of = <R, A>(a: A): Reader<R, A> => {
  return (_: R) => a;
};

const flatMap = <R, A, B>(fa: Reader<R, A>, f: (a: A) => Reader<R, B>): Reader<R, B> => {
  return (r: R) => f(fa(r))(r);
};

const ask = <R>(): Reader<R, R> => {
  return (r: R) => r;
};

const asks = <R, A>(f: (r: R) => A): Reader<R, A> => {
  return (r: R) => f(r);
};

/////////////
/////////////
/////////////
type Config = {
  apiUrl: string;
  apiKey: string;
};

type Logger = {
  log: (message: string) => void;
};

type Env = {
  config: Config;
  logger: Logger;
};

const getEnv: Reader<Env, Env> = ask<Env>();
const getConfig: Reader<Env, Config> = asks((env: Env) => env.config);
const getLogger: Reader<Env, Logger> = asks((env: Env) => env.logger);

const fetchData = (endpoint: string): Reader<Env, Promise<any>> =>
  flatMap(getConfig, (config) =>
    flatMap(ask<Env>(), ({ logger }) => {
      const url = `${config.apiUrl}/${endpoint}?key=${config.apiKey}`;
      logger.log(`Fetching data from ${url}`);

      return of(
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            logger.log("Data fetched successfully");
            return data;
          })
          .catch((error) => {
            logger.log(`Error fetching data: ${error}`);
            throw error;
          })
      );
    })
  );

// Usage
const env: Env = {
  config: { apiUrl: "https://jsonplaceholder.typicode.com", apiKey: "secret-key" },
  logger: { log: (message: string) => console.log(message) },
};

fetchData("users/1")(env).then((data) => console.log(data));
