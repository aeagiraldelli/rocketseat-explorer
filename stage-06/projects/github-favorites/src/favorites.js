const localstorageKey = '@github-favorites:';

export class GithubUser {
  static search(login) {
    const endpoint = `https://api.github.com/users/${login}`;
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

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    const localdata = localStorage.getItem(localstorageKey);
    this.data = JSON.parse(localdata) || [];
  }

  save(user) {
    this.data = [user, ...this.data];
    localStorage.setItem(localstorageKey, JSON.stringify(this.data));
  }

  remove(user) {
    const filteredData = this.data.filter((entry) => {
      return user.login !== entry.login;
    });
    this.data = filteredData;
    localStorage.setItem(localstorageKey, JSON.stringify(this.data));
  }

  exists(login) {
    const userFound = this.data.filter((entry) => {
      return login === entry.login;
    });

    return userFound.length > 0;
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.update();
    this.onAdd();
  }

  onAdd() {
    const btn = document.getElementById('btn-search');
    const input = document.getElementById('input-search');

    btn.onclick = () => {
      const value = input.value;
      if (value) {
        if (this.exists(value)) {
          alert('Usuário já cadastrado na lista.');
          input.focus();
          return;
        }

        GithubUser.search(value)
          .then((user) => {
            if (user) {
              this.save(user);
              this.update();
              input.value = '';
            }
          })
          .catch((error) => alert('Erro ao procurar pelo usuário.'));
      }
    };

    input.onkeydown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        btn.click();
        input.value = '';
      }
    };
  }

  update() {
    this.removeLines();
    const tbody = this.root.querySelector('table tbody');
    this.data.forEach((el) => {
      const row = this.createRow(el);
      row.querySelector('button').onclick = () => {
        const shouldRemove = confirm(
          'Tem certeza que deseja excluir esse registro? Essa ação não poderá ser desfeita.'
        );

        if (shouldRemove) {
          this.remove(el);
        }

        this.update();
      };

      tbody.append(row);
    });
  }

  createRow(user) {
    const tr = document.createElement('tr');
    const row = `
        <td class="user-data">
          <img
            class="user-avatar"
            src="https://github.com/${user.login}.png"
            alt="Imagem do usuário ${user.name}"
          />
          <a
            rel="noopener"
            href="https://github.com/${user.login}"
            target="_blank"
          >
            <p class="username">${user.name}</p>
            <span class="nickname">${user.login}</span>
          </a>
          </td>
          <td class="repo-number">${user.public_repos}</td>
          <td class="followers-number">${user.followers}</td>
          <td><button class="btn-del">&times;</button></td>
    `;
    tr.innerHTML = row;

    return tr;
  }

  removeLines() {
    const tbody = this.root.querySelector('table tbody');
    tbody.querySelectorAll('tr').forEach((el) => {
      el.remove();
    });
  }
}
