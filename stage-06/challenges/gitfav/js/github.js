export class Github {
  static fetchData(userlogin) {
    const endpoint = `https://api.github.com/users/${userlogin}`;
    return fetch(endpoint)
      .then((data) => data.json())
      .then((data) => {
        return {
          login: data.login,
          name: data.name,
          public_repos: data.public_repos,
          followers: data.followers,
        };
      });
  }
}
