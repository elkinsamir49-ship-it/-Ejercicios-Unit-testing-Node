const { maskEmail, reverseWords, extractHashtags } = require('../src2/stringProcessor');

describe('Pruebas unitarias para stringProcessor.js', () => {

  describe('maskEmail()', () => {
    it('email normal: oculta el usuario dejando solo el primer y último carácter', () => {
      expect(maskEmail('sergio@gmail.com')).toBe('s****o@gmail.com');
      expect(maskEmail('hola@domain.co')).toBe('h**a@domain.co');
    });

    it('usuario de 1 char: devuelve el email sin cambios', () => {
      expect(maskEmail('a@gmail.com')).toBe('a@gmail.com');
    });

    it('email sin @: lanza un Error', () => {
      expect(() => maskEmail('sergiogmail.com')).toThrow(Error);
    });
  });

  describe('reverseWords()', () => {
    it('oración normal: invierte correctamente el orden de las palabras', () => {
      expect(reverseWords('hola mundo node')).toBe('node mundo hola');
    });

    it('una sola palabra: devuelve la misma palabra sin alterar', () => {
      expect(reverseWords('javascript')).toBe('javascript');
    });

    it('espacios múltiples: maneja y limpia los espacios extras entre palabras', () => {
      expect(reverseWords('  hola    mundo   node  ')).toBe('node mundo hola');
    });

    it('texto vacío o solo espacios: devuelve un string vacío ""', () => {
      expect(reverseWords('')).toBe('');
      expect(reverseWords('     ')).toBe('');
    });
  });

  describe('extractHashtags()', () => {
    it('múltiples hashtags: extrae todos los hashtags encontrados en el texto', () => {
      expect(extractHashtags('Me gusta #node y #testing')).toEqual(['#node', '#testing']);
    });

    it('sin hashtags: devuelve un array vacío [] si no hay coincidencias', () => {
      expect(extractHashtags('Esto es un texto normal sin etiquetas')).toEqual([]);
    });

    it('# solo (sin texto después) o al final: no lo cuenta como hashtag válido', () => {
      expect(extractHashtags('Esto es un # solo')).toEqual([]);
      expect(extractHashtags('Termina en #')).toEqual([]);
    });
  });

});