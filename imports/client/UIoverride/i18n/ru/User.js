export default {
  resources: {
    User: {
      name: 'Пользователь |||| Пользователи',
      fields: {
        id: 'Id',
        userName: 'пользователь',
        password: 'пароль',
        isAdmin: 'администратор?',
        isSystem: 'системный пользователь?',
        enabled: 'разрешен вход?',
      },
    },
  },
}