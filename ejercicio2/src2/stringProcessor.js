// Función 1 

function maskEmail(email) {
  if (!email || !email.includes('@')) {
    throw new Error('El email debe contener un carácter "@".');
  }

  const [user, domain] = email.split('@');

  if (user.length <= 1) {
    return email;
  }
  const firstChar = user[0];
  const lastChar = user[user.length - 1];
  const maskedLength = user.length - 2;
  const maskedUser = firstChar + '*'.repeat(maskedLength) + lastChar;
  return `${maskedUser}@${domain}`;
}

// Función 2 


function reverseWords(sentence) {
  if (!sentence || sentence.trim() === '') {
    return '';
  }

  return sentence.trim().split(/\s+/).reverse().join(' ');
}

function extractHashtags(text) {
  if (!text) return [];
  const matches = text.match(/#\w+/g);
  return matches || [];
}

module.exports = { maskEmail, reverseWords, extractHashtags };