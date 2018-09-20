const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwkwsRsa = require('jwks-rsa');

const app = express();

const questions = [];

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', (req,res) => {
  const qs = questions.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers.length
  }));

  res.send(qs);
});

app.get('/:id', (req, res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
});

const checkJwt = jwt({
  secret: jwkwsRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://raini35.auth0.com/.well-known/jwkws.json`
  }),
  audience: '6hV0zJ5q5B0Oqck0JzsEUMoqSCjaxpHW',
  issuer: `https://raini35.auth0.com/`,
  algorithms: ['RS256']
});

app.post('/', checkJwt, (req, res) => {
  console.log("Posting /");
  console.log("req.body: " + req.body);
  const {title, description} = req.body;
  console.log("title: " + title)
  console.log("description: " + description);

  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name, 
  };
  questions.push(newQuestion);
  res.status(200).send();
});

app.post('/answer/:id', checkJwt, (req, res) => {
  console.log("Posting /answer/:id");
  console.log("req.body: " + req.body);
  const {answer} = req.body;
  console.log("{answer}: " + answer);

  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if(question.length > 1) return res.status(500).send();
  if(question.length === 0) return res.status(404).send();

  question[0].answers.push({
    answer,
    author: req.user.name
  });

  res.status(200).send();

});

app.listen(8081, () => {
  console.log('listening on port 8001');
});
