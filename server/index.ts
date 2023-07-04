const config = useRuntimeConfig();

export default async () => {
  try {
    console.log('server start');
  } catch (err) {
    console.error('server start fail', err);
  }
};
