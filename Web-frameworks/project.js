//  a Basic API to get current time in 5 different timezone using Express

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const date = new Date();
  const timezones = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' }
  ];

  const result = timezones.map(({name, timezone}) => {
    return {
      location: name,
      time: new Date(date.toLocaleString('en-US', { timeZone: timezone }))
    };
  });

  res.json(result);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
