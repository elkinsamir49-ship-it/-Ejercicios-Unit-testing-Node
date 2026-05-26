// Función 1 — factorial
function factorial(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('El argumento debe ser un número entero.');
  }
  if (n < 0) {
    throw new RangeError('El número no puede ser negativo.');
  }
  
  if (n === 0) return 1;
  
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Función 2
function isPrime(n) {
  if (n < 2) return false;
  
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 2; i <= limit; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Función 3 
function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError('El valor mínimo no puede ser mayor que el máximo.');
  }
  
  return Math.min(Math.max(value, min), max);
}

module.exports = { factorial, isPrime, clamp };