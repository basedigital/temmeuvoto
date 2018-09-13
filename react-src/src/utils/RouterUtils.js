let _router;
let _memoryRouter;

export function setMemoryRouter(router) {
    _memoryRouter = router;
}

export function getMemoryRouter() {
    return _memoryRouter;
}

export function setRouter(router) {
    _router = router;
}

export function getRouter() {
    return _router;
}
