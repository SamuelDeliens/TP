import CardsPage from "@/pages/CardsPage.vue";
import CardDetailPage from "@/pages/CardDetailPage.vue";
import Error404Page from "@/pages/Error404Page.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    { path: '/cards', component: CardsPage },
    { path: '/cards/:cardId', component: CardDetailPage },
    { path: '/:catchAll(.*)', component: Error404Page },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;
