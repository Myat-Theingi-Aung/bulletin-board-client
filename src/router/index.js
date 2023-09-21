import { createRouter, createWebHistory } from 'vue-router'
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
    { path: '/change/password', name: 'change', component: ChangePasswordView },
    { path: '/sign-up', name: 'signUp', component: SignUpView},

    { path: '/users', name: 'users', component: UserListView },
    { path: '/users/create/confirm', name: 'usersCreate', component: UserCreateConfirmView },
    { path: '/users/edit', name: 'usersEdit', component: UserEditView },
    { path: '/users/profile', name: 'usersProfile', component: UserProfileView },

    { path: '/', name: 'posts', component: PostListView },
    { path: '/posts/create', name: 'postsCreate', component: PostCreateView },
    { path: '/posts/create/confirm', name: 'postsCreateConfirm', component: PostCreateConfirmView },
    { path: '/posts/:id', name: 'postsEdit', component: PostEditView },
    { path: '/posts/edit/confirm', name: 'postsEditConfirm', component: PostEditConfirmView },
    { path: '/posts/upload', name: 'postsUpload', component: PostUploadView },

    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

export default router;
