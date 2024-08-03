// Reader functor type
type Reader<R, A> = (env: R) => A;

// fmap for Reader
const map = <R, A, B>(reader: Reader<R, A>, f: (a: A) => B): Reader<R, B> => {
  return (env: R) => f(reader(env));
};

// flatMap for Reader
const flatMap = <R, A, B>(
  reader: Reader<R, A>,
  f: (a: A) => Reader<R, B>
): Reader<R, B> => {
  return (env: R) => f(reader(env))(env);
};

// Example usage

// Let's assume we have a configuration object
interface Config {
  baseUrl: string;
  apiKey: string;
}

// Function that returns a Reader
const getApiUrl =
  (endpoint: string): Reader<Config, string> =>
  (config: Config) =>
    `${config.baseUrl}/${endpoint}?api_key=${config.apiKey}`;

// Function that returns a Reader
const getApiKey = (): Reader<Config, string> => (config: Config) =>
  config.apiKey;

// Composing Readers
// const apiUrlWithKey = flatMap(getApiUrl("users"), (url) =>
//   map(getApiKey(), (key) => `${url}&key=${key}`)
// );

// Running the Reader with an environment
const config: Config = { baseUrl: "https://api.example.com", apiKey: "12345" };

console.log(getApiUrl("users")(config)); // Output: https://api.example.com/users?api_key=12345&key=12345
