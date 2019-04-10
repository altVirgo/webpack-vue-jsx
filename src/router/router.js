import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// import PageA from '../app/components/pageA/pageA.jsx';
// import Dashboard from '../app/components/dashboard/dashboard.jsx';
// import ChildrenOne from '../app/components/dashboard/children-one/children-one.jsx';
// import ChildrenTwo from '../app/components/dashboard/children-two/children-two.jsx';
// import ChildrenThree from '../app/components/dashboard/children-three/children-three.jsx';
export default new Router({
    linkActiveClass: 'active',
    routes: [{
        path: '/',
        redirect: '/dashboard'
    }, {
        path: '/dashboard',
        name: 'dashboard',
        component: (resolve) => require(['../app/components/dashboard/dashboard.jsx'], resolve),
        children: [
            {
                path: '/',
                name: 'childrenOne',
                redirect: './childrenOne'
            }, {
                path: '/dashboard/childrenOne',
                name: 'childrenOne',
                component: (resolve) => require(['../app/components/dashboard/children-one/children-one.jsx'], resolve)

            }, {
                path: '/dashboard/childrenTwo',
                name: 'childrenTwo',
                component: (resolve) => require(['../app/components/dashboard/children-two/children-two.jsx'], resolve)
            }, {
                path: '/dashboard/childrenThree',
                name: 'childrenThree',
                component: (resolve) => require(['../app/components/dashboard/children-three/children-three.jsx'], resolve)
            }
        ]
    }, {
        path: '/home',
        name: 'home',
        component: (resolve) => require(['../app/components/pageA/pageA.jsx'], resolve)
    }]
})
