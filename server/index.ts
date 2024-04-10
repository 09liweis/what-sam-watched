const config = useRuntimeConfig();

export default async () => {
  try {
    console.info('server start');
  } catch (err) {
    console.error('server start fail', err);
  }
};
