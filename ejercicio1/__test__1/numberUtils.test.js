const { factorial, isPrime, clamp } = require('../src1/numberUtils');

describe('Pruebas unitarias para numberUtils.js', () => {

  describe('factorial()', () => {
    it('caso normal: devuelve el factorial correcto de un número', () => {
      expect(factorial(5)).toBe(120);
      expect(factorial(3)).toBe(6);
    });

    it('caso n=0: por definición matemática debe devolver 1', () => {
      expect(factorial(0)).toBe(1);
    });

    it('caso negativo: lanza un RangeError si n es menor a 0', () => {
      expect(() => factorial(-5)).toThrow(RangeError);
    });

    it('caso decimal/no entero: lanza un TypeError', () => {
      expect(() => factorial(4.5)).toThrow(TypeError);
      expect(() => factorial('3')).toThrow(TypeError);
    });
  });

  describe('isPrime()', () => {
    it('primo conocido: devuelve true para números primos', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
    });


    it('no primo: devuelve false para números compuestos', () => {
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
    });

    it('casos 0 y 1: devuelve false porque no se consideran primos', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
    });

    it('número negativo: devuelve false para cualquier número menor a 2', () => {
      expect(isPrime(-7)).toBe(false);
    });
  });

  describe('clamp()', () => {
    it('valor dentro del rango: devuelve el mismo valor', () => {
      expect(clamp(5, 1, 10)).toBe(5);
    });

    it('valor menor: devuelve el límite mínimo (min)', () => {
      expect(clamp(-2, 1, 10)).toBe(1);
    });

    it('valor mayor: devuelve el límite máximo (max)', () => {
      expect(clamp(15, 1, 10)).toBe(10);
    });

    it('caso min === max: funciona correctamente en el límite exacto', () => {
      expect(clamp(5, 5, 5)).toBe(5);
      expect(clamp(3, 5, 5)).toBe(5);
    });

    it('caso min > max: lanza un RangeError', () => {
      expect(() => clamp(5, 10, 1)).toThrow(RangeError);
    });
  });

});