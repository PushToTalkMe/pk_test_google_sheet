const axios = require('axios');
const { google } = require('googleapis');
const {
  API_URL,
  USER_CREDENTIALS,
  GOOGLE_SHEET_ID,
  SUCCESS_REGISTRATION,
  ERROR_REGISTRATION,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  SUCCESS_GET_CLIENTS_STATUSES,
  ERROR_GET_CLIENTS_STATUSES,
  SUCCESS_GET_CLIENTS_DATA,
  ERROR_GET_CLIENTS_DATA,
  GOOGLE_AUTH_SCOPES,
  GOOGLE_API_PATH,
  SUCCESS_WRITE_GOOGLE_SHEETS,
  ERROR_WRITE_GOOGLE_SHEETS,
  ERROR_APP,
} = require('./constants');

async function registerUser() {
  try {
    const response = await axios.post(
      `${API_URL}/auth/registration`,
      USER_CREDENTIALS,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    console.log(SUCCESS_REGISTRATION, response.data.token);
    return response.data.token;
  } catch (error) {
    console.error(ERROR_REGISTRATION, error.response?.data || error.message);
  }
}

async function getAuthToken() {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      USER_CREDENTIALS,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    console.log(SUCCESS_LOGIN, response.data.token);
    return response.data.token;
  } catch (error) {
    console.error(ERROR_LOGIN, error.response?.data || error.message);
    throw error;
  }
}

async function getClientsStatuses(userIds, token) {
  try {
    const response = await axios.post(
      `${API_URL}/clients`,
      { userIds },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(SUCCESS_GET_CLIENTS_STATUSES);
    return response.data;
  } catch (error) {
    console.error(
      ERROR_GET_CLIENTS_STATUSES,
      error.response?.data || error.message,
    );
    throw error;
  }
}

async function getClientsData(token) {
  try {
    const response = await axios.get(`${API_URL}/clients`, {
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
    console.log(SUCCESS_GET_CLIENTS_DATA);
    const userIds = response.data.map((client) => client.id);

    const clientStatuses = await getClientsStatuses(userIds, token);
    const combinedData = response.data.map((client) => ({
      ...client,
      status:
        clientStatuses.find((status) => status.id === client.id)?.status ||
        'Unknown status',
    }));
    return combinedData;
  } catch (error) {
    console.error(
      ERROR_GET_CLIENTS_DATA,
      error.response?.data || error.message,
    );
    throw error;
  }
}

async function writeToGoogleSheets(data) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: __dirname + GOOGLE_API_PATH,
      scopes: [GOOGLE_AUTH_SCOPES],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const values = [
      [
        'ID',
        'First Name',
        'Last Name',
        'Gender',
        'Address',
        'City',
        'Phone',
        'Email',
        'Status',
      ],
      ...data.map((client) => [
        client.id,
        client.firstName,
        client.lastName,
        client.gender,
        client.address,
        client.city,
        client.phone,
        client.email,
        client.status,
      ]),
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      resource: { values },
    });

    console.log(SUCCESS_WRITE_GOOGLE_SHEETS);
  } catch (error) {
    console.error(ERROR_WRITE_GOOGLE_SHEETS, error.message);
    throw error;
  }
}

(async () => {
  try {
    let token = await registerUser();
    if (!token) {
      token = await getAuthToken();
    }
    const clientsData = await getClientsData(token);
    await writeToGoogleSheets(clientsData);
  } catch (error) {
    console.error(ERROR_APP, error.message);
  }
})();
