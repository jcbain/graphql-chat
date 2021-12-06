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
        console.log(res)
        if(res.status !== 200) {
          console.log(res)
          return;
        }
        return res.json()
      });
};