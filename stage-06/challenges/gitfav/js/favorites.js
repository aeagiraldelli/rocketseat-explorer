import { Github } from './github.js';

const localstorageKey = '@github-favorites:';

export class Favorites {
  constructor(rootelement) {
    this.root = document.querySelector(rootelement);
    this.load();
  }

  load() {
    const localData = localStorage.getItem(localstorageKey);
    this.data = JSON.parse(localData) || [];
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

  exists(userlogin) {
    const userFound = this.data.filter((entry) => {
      return userlogin === entry.login;
    });

    return userFound.length > 0;
  }
}

export class FavoritesView extends Favorites {
  constructor(rootelement) {
    super(rootelement);
    this.update();
    this.onAdd();
  }

  onAdd() {
    const btn = document.getElementById('btn-add-favorite');
    const input = document.getElementById('input-search');

    btn.onclick = () => {
      const value = input.value;
      if (value) {
        if (this.exists(value)) {
          alert('Usuário já cadastrado na lista.');
          input.focus();
          return;
        }

        Github.fetchData(value)
          .then((user) => {
            if (user) {
              this.save(user);
              this.update();
              input.value = '';
            }
          })
          .catch((error) => alert('Erro ao procurar pelo usuário informado.'));
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
        const canRemove = confirm(
          'Tem certeza que deseja excluir este registro? Essa ação não poderá ser desfeita.'
        );

        if (canRemove) {
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
      <tr>
        <td class="user-data">
          <img
            class="user-avatar"
            src="https://github.com/${user.login}.png"
            alt="Imagem do usuário ${user.name}"
          />
          <a class="user-info" href="https://github.com/${user.login}" rel="noopener" target="_blank">
            <p class="user-name">${user.name}</p>
            <span class="user-login">${user.login}</span>
          </a>
        </td>
        <td class="center-data">${user.public_repos}</td>
        <td class="center-data">${user.followers}</td>
        <td class="center-data">
          <button class="btn btn-remove">Remover</button>
        </td>
      </tr>`;

    tr.innerHTML = row;
    return tr;
  }

  removeLines() {
    const tbody = this.root.querySelector('table tbody');
    tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove();
    });
  }
}
