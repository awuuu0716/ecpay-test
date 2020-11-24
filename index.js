const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const indexController = require('./controllers/index');
const paymentController = require('./controllers/payment')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', indexController.renderIndexPage);
// 取得付款頁面
app.get('/payment', paymentController.renderPaymentPage);
// 接收付款結果
app.post('/payment', paymentController.handlePaymentResult);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});