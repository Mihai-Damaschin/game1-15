import { $lazy } from "./helpers";

// prettier-ignore
const routes = [
  { name: 'HomePage', path: '/', component: $lazy('home', 'HomePage'), suspense: 'home', exact: true },

  { name: 'Game15', path: '/game15', component: $lazy('game15', 'Game15Page'), suspense: 'game15', exact: true },
];

export default routes;
