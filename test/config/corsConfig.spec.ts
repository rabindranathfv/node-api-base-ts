
import corsConfig from './../../src/config/corsConfig';
describe('Cors Config unit Tests', () => {
  it('should load cors config correctly from env', () => {
      console.log("value", corsConfig)
      expect(corsConfig).toEqual({
        allowedHeaders: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        origin: '*'
      })
   })

})