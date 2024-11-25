const API_URL = 'http://94.103.91.4:5000';
const USER_CREDENTIALS = {
  username: 'vialkaff',
};

const GOOGLE_SHEET_ID = '1VHCk0SjrVIMuCzUbIm9QsJl9wNBIph43ciRvTegkUMo';
const GOOGLE_API_PATH = '/configs/google.api.json';
const GOOGLE_AUTH_SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

const SUCCESS_REGISTRATION =
  'Пользователь успешно зарегистрирован. Токен доступа:';
const SUCCESS_LOGIN = 'Пользователь успешно авторизовался. Токен доступа:';
const SUCCESS_GET_CLIENTS_STATUSES = 'Получены статусы клиентов';
const SUCCESS_GET_CLIENTS_DATA = 'Получены данные о клиентах';
const SUCCESS_WRITE_GOOGLE_SHEETS = 'Данные успешно записаны в Google Sheets';

const ERROR_REGISTRATION = 'Ошибка при регистрации:';
const ERROR_LOGIN = 'Ошибка при авторизации:';
const ERROR_GET_CLIENTS_STATUSES = 'Ошибка при получении статусов клиентов:';
const ERROR_GET_CLIENTS_DATA = 'Ошибка при получении данных клиентов:';
const ERROR_WRITE_GOOGLE_SHEETS = 'Ошибка при записи в Google Sheets:';
const ERROR_APP = 'Ошибка выполнения программы:';

module.exports = {
  API_URL,
  USER_CREDENTIALS,
  GOOGLE_SHEET_ID,
  GOOGLE_API_PATH,
  GOOGLE_AUTH_SCOPES,
  SUCCESS_REGISTRATION,
  SUCCESS_LOGIN,
  SUCCESS_GET_CLIENTS_STATUSES,
  SUCCESS_GET_CLIENTS_DATA,
  SUCCESS_WRITE_GOOGLE_SHEETS,
  ERROR_REGISTRATION,
  ERROR_LOGIN,
  ERROR_GET_CLIENTS_STATUSES,
  ERROR_GET_CLIENTS_DATA,
  ERROR_WRITE_GOOGLE_SHEETS,
  ERROR_APP,
};
