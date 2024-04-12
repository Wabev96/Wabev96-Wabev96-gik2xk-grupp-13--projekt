const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: '^E-postaddressen måste vara minst %{count} tecken lång.',
      tooLong: '^E-postaddressen får inte vara längre än %{count} tecken lång.',
    },
    email: {
      message: '^E-postaddressen är i ett felaktigt format.',
    },
  },
  password: {
    length: {
      minimum: 8,
      maximum: 20,
      tooShort: '^Lösenordet måste vara minst %{count} tecken lång.',
      tooLong: '^Lösenordet får inte vara längre än %{count} tecken lång.',
    },
    format: {
      pattern: '[A-Za-z0-9]+',
      message: '^Lösenordet är i ett felaktigt format.',
    },
  },
};

module.exports = constraints;
