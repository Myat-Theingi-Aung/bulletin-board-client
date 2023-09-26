import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import NotFound from '../views/NotFoundView.vue'

import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import ResetPasswordView from '../views/auth/ResetPasswrodView.vue'
import ChangePasswordView from '../views/auth/ChangePasswordView.vue'
import SignUpView from '../views/auth/SignUpView.vue'

import PostListView from '../views/post/ListView.vue'
import PostCreateView from '../views/post/CreateView.vue'
import PostCreateConfirmView from '../views/post/CreateConfirmView.vue'
import PostEditView from '../views/post/EditView.vue'
import PostEditConfirmView from '../views/post/EditConfirmView.vue'
import PostUploadView from '../views/post/UploadView.vue'

import UserListView from '../views/user/ListView.vue'
import UserCreateConfirmView from '../views/user/CreateConfrimView.vue'
import UserEditView from '../views/user/EditView.vue'
import UserProfileView from '../views/user/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/forgot', name: 'forgot', component: ForgotPasswordView },
    { path: '/reset', name: 'reset', component: ResetPasswordView },
    { path: '/change/password', name: 'change', component: ChangePasswordView, meta: { requiresAuth: true } },
    { path: '/sign-up', name: 'signUp', component: SignUpView},

    { path: '/users', name: 'users', component: UserListView, meta: { requiresAuth: true }, },
    { path: '/users/create/confirm', name: 'usersCreate', component: UserCreateConfirmView, meta: { requiresAuth: true }, },
    { path: '/users/edit', name: 'usersEdit', component: UserEditView, meta: { requiresAuth: true }, },
    { path: '/users/profile', name: 'usersProfile', component: UserProfileView, meta: { requiresAuth: true }, },

    { path: '/', name: 'posts', component: PostListView },
    { path: '/posts/create', name: 'postsCreate', component: PostCreateView, meta: { requiresAuth: true }, },
    { path: '/posts/create/confirm', name: 'postsCreateConfirm', component: PostCreateConfirmView, meta: { requiresAuth: true }, },
    { path: '/posts/:id', name: 'postsEdit', component: PostEditView, meta: { requiresAuth: true }, },
    { path: '/posts/edit/confirm', name: 'postsEditConfirm', component: PostEditConfirmView, meta: { requiresAuth: true }, },
    { path: '/posts/upload', name: 'postsUpload', component: PostUploadView, meta: { requiresAuth: true }, },

    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) 
  {
    const isAuthenticated = store.state.user;

    Object.keys(isAuthenticated).length > 0 ? next() : next('/login')
  } 
  
  next();
});

export default router;
