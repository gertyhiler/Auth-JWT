#JWT
Для использования необходимо выполнить установку зависимостей для клиента и сервера
> `npm i`
##Сервер
.env файл 
* PORT = на каком порту запустить сервер
* DB_URL=mongodb+srv:// и другие буквы, которые берутся из админки mongodb для авторизации
* JWT_ACCESS_SECRET=Любая строка
* JWT_REFRESH_SECRET=Любая строка
* SMTP_HOST=Сервер для отправки почты
* SMTP_PORT=Порт сервера для отправки почты
* SMTP_USER=Логин для сервера для отправки почты
* SMTP_PASSWORD=Пароль от этого логина
* FRONTEND_URL=http://localhost:3000 или другой URL фронта
* API_URL=http://localhost:5700 
> `npm run dev` - для запуска сервера

##Клиент
> `npm run dev ` - для запуска клиента, по умолчанию стартует локально на 3000 порту
