export const sendRequest = async ({url, method='GET', body}) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`
    }
  };
  if (body) {
    options.body = body;
  }
  return await $fetch(url, options);
}