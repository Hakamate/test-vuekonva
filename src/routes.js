import RectChild from './pages/RectChild'
import CircleShoot from './pages/CircleShoot'
import Snake from './pages/Snake'

export default [
    {
        name: "RectChild",
        path: "/rectchild",
        component: RectChild
    },
    {
        name: "Home",
        path: "/",
        redirect: "/rectchild"

    },
    {
        name: "CircleShoot",
        path: "/circleshoot",
        component: CircleShoot
    },
    {
        name: "Snake",
        path: "/snake",
        component: Snake
    },
]