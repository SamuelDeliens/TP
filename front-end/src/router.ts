import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from "@/layout/AuthLayout.vue";
import CardsPage from "@/pages/CardsPage.vue";
import CardDetailPage from "@/pages/CardDetailPage.vue";
import SignInPage from "@/pages/auth/SignInPage.vue";
import Error404Page from "@/pages/Error404Page.vue";
import {useAuthStore} from "@/stores/auth.store.ts";
import RegisterPage from "@/pages/auth/RegisterPage.vue";
import OauthPage from "@/pages/auth/OauthPage.vue";
import GachaPage from "@/pages/GachaPage.vue";
import UserCards from "@/pages/UserCards.vue";

const routes = [
    {
        path: '',
        meta: { requiresVerified: true },
        children: [
            {
                path: '',
                meta: { requiresAuth: true },
                component: AuthLayout,
                children: [
                    { path: '', component: UserCards },
                    { path: 'gacha', component: GachaPage },
                    { path: 'cards', name: 'cards', component: CardsPage },
                    { path: 'cards/:cardId', component: CardDetailPage },
                ]
            },

            { path: '/login', meta: { requiresVerified: true }, component: SignInPage },

            { path: '/register', component: RegisterPage },
            { path: '/:catchAll(.*)', component: Error404Page }
        ]
    },

    { path: '/oauth', component: OauthPage },
    { path: '/oauth/callback', component: OauthPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

router.beforeEach(async (to) => {
    const auth = useAuthStore();

    if (!auth.loading) {
        await auth.init();
    }

    if (to.meta.requiresVerified && !auth.isVerified) {
        return { path: '/oauth' }
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return { path: '/login' }
    }

    //if we are in a login page or verified page => redirect to home
    if ((!to.meta.requiresVerified && auth.isVerified) || (!to.meta.requiresAuth && auth.isAuthenticated)) {
        return { path: '' }
    }
});

export default router
