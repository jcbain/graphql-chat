export const makeHttpRequest = (requestBody) => {
    return fetch('/graphql', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      })
      .then(res => {
        if(res.status !== 200) {
          return;
        }
        return res.json()
      });
};