import RectChild from './pages/RectChild'
import CircleShoot from './pages/CircleShoot'

export default [
    {
        name: "RectChild",
        path: "/rectchild",
        component: RectChild
    },
    {
        name: "Home",
        path: "/",
        redirect: "/rectchild",
    },
    {
        name: "CircleShoot",
        path: "/circleshoot",
        component: CircleShoot
    }
]