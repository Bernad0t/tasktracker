export class BaseCustomError extends Error {
    constructor(message: string) {
      super(message);  // Передаем сообщение в конструктор базового класса
      this.name = this.constructor.name;  // Устанавливаем имя ошибки по имени класса
      Error.captureStackTrace(this, this.constructor);  // Устанавливаем корректный стектрейс для отладки
    }
}