export const appsettings = require('appsettings.json')

export const environment = appsettings[appsettings.Environment];

export const isDevelopment: boolean = appsettings.Environment === 'Development';

export const apiBaseUrl = environment.apiBaseUrl;

export const zoom_jwtToken = environment.zoom_jwtToken;

export const payStackPublicKey = environment.payStackPublicKey;
