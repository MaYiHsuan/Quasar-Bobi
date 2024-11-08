const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("../pages/IndexPage.vue") },
      { path: "service", component: () => import("../pages/Service.vue") },
      {
        path: "home",
        name: "home",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "contact",
        name: "contact",
        component: () => import("../views/ContactView.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/ErrorNotFound.vue"),
  },
];

export default routes;
