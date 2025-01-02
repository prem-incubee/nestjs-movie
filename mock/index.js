const express = require('express');
const app = express();
const { faker } = require('@faker-js/faker');

app.get('/movies/:name', (req, res) => {
  res.json({
    data: {
      meta: {
        name: req.params.name,
        releasedOn: faker.date.past({ years: 50 }),
      },
      cast: { director: faker.person.fullName() },
      money: { made: faker.finance.amount(), budget: faker.finance.amount() },
    },
  });
});

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3001);
