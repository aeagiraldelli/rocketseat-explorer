export class Router {
  routes = {};
  bgManager = null;

  add(routename, pagelink) {
    this.routes[routename] = pagelink;
  }

  setBgManager(bgManager) {
    this.bgManager = bgManager;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    if (event.target.href) {
      window.history.pushState({}, '', event.target.href);
    } else if (event.target.id && event.target.id == 'btn-more') {
      window.history.pushState({}, '', '/universe');
    }

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.getElementById('app').innerHTML = html;
      })
      .then(() => {
        if (this.bgManager != null) {
          this.bgManager.handle(pathname);
        }
      })
      .then(() => {
        const links = document.querySelectorAll('a');
        links.forEach((el) => {
          el.classList.remove('link-item-highlight');
        });
        const element = document.querySelectorAll(`[href="${pathname}"]`)[0];
        element.classList.add('link-item-highlight');
      });
  }
}
