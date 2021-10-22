export class BaseRouter {
    list = [];
    constructor(list) {
        this.list = list;
    }
    render(state) {
        let ele = this.list.find((ele) => ele.path === state);
        return ele;
    }
}

// 使用 hashchange 监听
export class HashRouter extends BaseRouter {
    constructor(list) {
        super(list);
    }
    handler() {
        this.render(this.getState());
    }
    // 获取 hash 值
    getState() {
        const hash = window.location.hash;
        return hash ? hash.slice(1) : "/";
    }
    // push 新页面
    push(path: string) {
        window.location.hash = path;
    }
    getUrl(path: string) {
        const href = window.location.href;
        const i = href.indexOf("#");
        const base = i >= 0 ? href.slice(0, i) : href;
        return base + "#" + path;
    }
    replace(path) {
        window.location.replace(this.getUrl(path));
    }
    // 前进 or 后退浏览历史
    go(n) {
        window.history.go(n);
    }
}
// 使用 popstate 来监听 url 变化
export class HistoryRouter extends BaseRouter {
    constructor(list) {
        super(list);
    }
    handler() {
        this.render(this.getState());
    }
    getState() {
        const path = window.location.pathname;
        return path ? path : "/";
    }
    push(path) {
        history.pushState(null, null, path);
    }
    replace(path) {
        history.replaceState(null, null, path);
    }
    go(n) {
        window.history.go(n);
    }
}
