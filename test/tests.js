import { expect } from 'chai';
import { checkWeather, transformWeatherData, handleError, getWeatherIcon } from '../src/script.js';
import nock from 'nock';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

global.document = dom.window.document;
global.window = dom.window;

// Unit Tests
describe('Unit Tests', () => {
  describe('transformWeatherData', () => {
    it('Should correctly transform weather data including city, temperature, humidity, wind, weather icon, weather state, and error state', async () => {
      const apiData = {
        name: 'Barcelona',
        main: {
          temp: 293.15, // Provide a temperature value for testing
          humidity: 70, // Provide a humidity value for testing
        },
        wind: {
          speed: 5, // Provide a wind speed value for testing
        },
        weather: [
          {
            main: 'Clear', // Provide a weather condition for testing
          },
        ],
      };
    
      const result = await transformWeatherData(apiData);
    
      expect(result.city).to.equal('Barcelona');
      expect(result.weatherIcon).to.equal('../images/rain.png'); // Updated expected value
      expect(result.temp).to.equal('20°C'); // Updated expected value
      expect(result.humidity).to.equal('70%'); // Updated expected value
      expect(result.wind).to.equal('5 km/h'); // Updated expected value
     
      expect(result.weather).to.equal('block');
      expect(result.error).to.equal('none');
    });
  });

  describe('handleError', () => {
    it('Should return an error object with empty properties and the error message', async () => {
      const error = new Error('This is an error'); // Create an Error object with a message
      const result = handleError(error);

      expect(result.city).to.equal('');
      expect(result.temp).to.equal('');
      expect(result.humidity).to.equal('');
      expect(result.wind).to.equal('');
      expect(result.weatherIcon).to.equal('');
      expect(result.weather).to.equal('none');
      expect(result.error).to.equal('This is an error'); // Check the actual error message
    });

    it('Should return an error object with empty properties for a null error', async () => {
      const result = handleError(null); // Passing a null error

      expect(result.city).to.equal('');
      expect(result.temp).to.equal('');
      expect(result.humidity).to.equal('');
      expect(result.wind).to.equal('');
      expect(result.weatherIcon).to.equal('');
      expect(result.weather).to.equal('none');
      expect(result.error).to.equal(''); // Check that error.message is an empty string
    });
  });

  describe('getWeatherIcon', () => {
    it('Should return the correct icon for "Clouds"', () => {
      const result = getWeatherIcon("Clouds");
      expect(result).to.equal("../images/clouds.png");
    });

    it('Should return the correct icon for "Rain"', () => {
      const result = getWeatherIcon("Rain");
      expect(result).to.equal("../images/rain.png");
    });

    it('Should return the correct icon for "Drizzle"', () => {
      const result = getWeatherIcon("Drizzle");
      expect(result).to.equal("../images/drizzle.png");
    });

    it('Should return the correct icon for "Mist"', () => {
      const result = getWeatherIcon("Mist");
      expect(result).to.equal("../images/mist.png");
    });

    it('Should return the default icon for an unknown weather condition', () => {
      const result = getWeatherIcon("UnknownWeather");
      expect(result).to.equal("../images/rain.png"); 
    });
  });
});

// Integration Tests
describe('Integration Tests', () => {
  beforeEach(() => {
    // Mock API responses here
    // Example:
    nock('http://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, {
        name: 'London',
        main: {
          temp: 25,
          humidity: 60,
        },
        wind: {
          speed: 15,
        },
        weather: [{ main: 'Sunny' }],
      });

    // Additional mocks as needed
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('Should return the correct weather data for a specific integration scenario', async () => {
   
  });
});
