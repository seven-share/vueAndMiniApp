const Mock = require('mockjs')
let Random = Mock.Random
let users = []
for (let i = 0; i < 90; i++) {
    users.push(Mock.mock({
        id: i + 1,
        name: Random.cname(),
        addr: Random.county(true),
        sex: Random.integer(0, 1),
        birth: Mock.Random.date(),
        age: Random.integer(18, 60)
    }))
}



Mock.mock('/login', 'post', function (options) {
    const params = JSON.parse(options.body)
    const username = params.username;
    const psw = params.password;
    if (username == 'admin') {
        return { 'token': 1, 'scope': 32 }
    } else {
        return { 'token': 2, 'scope': 16 }
    }
});
Mock.mock('/getUserByPage', 'post', function (options) {
    const page = JSON.parse(options.body)

    const mockUser = users.filter((u, index) => {
        return index < page * 20 && index >= 20 * (page - 1)
    })
    // console.log(mockUser)

    return {
        // 'page':page,
        // 'users':mockUser
        'users': mockUser,
        'page': page
    }
})
Mock.mock('/removeUser', 'post', function (options) {
    const uid = JSON.parse(options.body)

    users = users.filter(u => u.id !== uid)
    return {
        'msg': '删除成功',
        'code': 200
    }
})

Mock.mock('/editUser', 'post', function (options) {
    const oneUser = JSON.parse(options.body)
    users.some(u => {
        if (u.id == oneUser.id) {
            u.id = oneUser.id;
            u.name = oneUser.name;
            u.addr = oneUser.addr;
            u.age = oneUser.age;
            u.birth = oneUser.birth;
            u.sex = oneUser.sex;
            return true

        }
    })
    return {
        'msg': '编辑成功',
        'code': 200
    }
})

Mock.mock('/batchRemoveUser', 'post', function (options) {
    const ids = JSON.parse(options.body)
    console.log(ids)
    users = users.filter(u => {
        return !ids.includes(u.id)
    })
    return {
        'msg': '编辑成功',
        'code': 200
    }
})
Mock.mock('/addUser', 'post', function (options) {
    const oneUser = JSON.parse(options.body)
    users.unshift(oneUser)
    return {
        'msg': '编辑成功',
        'code': 200
    }
})