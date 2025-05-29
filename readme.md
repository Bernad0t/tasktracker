в backend/.env.example указан пример .env файла, который нужно заполнить. Порт базы данных задуман как 5432. DB_HOST должен быть db.
Возможно, необходимо аочистит volumes в docker desktop

для запуска приложения использовать команду docker compose up -d --build

для остановки приложения использовать docker compose down