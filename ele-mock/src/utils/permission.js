export function hasPermission(router, scope) {
    if(router.meta && router.meta.scope){
        if(scope >= router.meta.scope){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}


export function filterShow(routerMap, scope) {
    const showRouters = routerMap.filter(router => {
        // console.log(hasPermission(router,scope))
        if (hasPermission(router, scope)) {
            if (router.children && router.children.length) {
                router.children = filterShow(router.children, scope)
            }
            return true
        } else {
            return false
        }
    })
    // console.log(showRouters)
    return showRouters
}