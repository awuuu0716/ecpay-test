const ecpay_payment = require('ecpay-payment');
const db = require('../models');

const { Payment_result } = db;

const getRandomUid = () => {
  let result = '';
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      result += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    } else {
      result += String.fromCharCode(48 + Math.floor(Math.random() * 10));
    }
  }
  return result;
};

// 結帳資訊
const base_param = {
  // 需要一個 function 隨機產生不重複的 20 碼 uid
  MerchantTradeNo: getRandomUid(), //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
  // 需要一個 function 產生這個時間格式的字串
  MerchantTradeDate: '2020/12/13 15:45:30', //ex: 2017/02/13 15:45:30
  TotalAmount: '100',
  TradeDesc: 'test',
  ItemName: 'test2',
  ReturnURL: 'https://serene-island-30572.herokuapp.com/payment',
  // ChooseSubPayment: '',
  // OrderResultURL: 'http://192.168.0.1/payment_result',
  // NeedExtraPaidInfo: '1',
  // ClientBackURL: 'https://www.google.com',
  // ItemURL: 'http://item.test.tw',
  // Remark: '交易備註',
  // StoreID: '',
  // CustomField1: '',
  // CustomField2: '',
  // CustomField3: '',
  // CustomField4: ''
};

// 若要測試開立電子發票，請將inv_params內的"所有"參數取消註解 //
const inv_params = {
  // RelateNumber: 'PLEASE MODIFY',  //請帶30碼uid ex: SJDFJGH24FJIL97G73653XM0VOMS4K
  // CustomerID: 'MEM_0000001',  //會員編號
  // CustomerIdentifier: '',   //統一編號
  // CustomerName: '測試買家',
  // CustomerAddr: '測試用地址',
  // CustomerPhone: '0123456789',
  // CustomerEmail: 'johndoe@test.com',
  // ClearanceMark: '2',
  // TaxType: '1',
  // CarruerType: '',
  // CarruerNum: '',
  // Donation: '2',
  // LoveCode: '',
  // Print: '1',
  // InvoiceItemName: '測試商品1|測試商品2',
  // InvoiceItemCount: '2|3',
  // InvoiceItemWord: '個|包',
  // InvoiceItemPrice: '35|10',
  // InvoiceItemTaxType: '1|1',
  // InvoiceRemark: '測試商品1的說明|測試商品2的說明',
  // DelayDay: '0',
  // InvType: '07'
};

const create = new ecpay_payment();
const htm = create.payment_client.aio_check_out_all(
  (parameters = base_param),
  (invoice = inv_params)
);

const paymentController = {
  renderPaymentPage: (req, res) => {
    res.send(htm);
  },
  renderAdminPage: (req, res) => {
    Payment_result.findAll().then((payments) => {
      res.render('admin', { payments });
    });
  },
  handlePaymentResult: (req, res) => {
    const {
      MerchantID,
      MerchantTradeNo,
      StoreID,
      RtnCode,
      RtnMsg,
      TradeNo,
      TradeAmt,
      PaymentDate,
      PaymentType,
      PaymentTypeChargeFee,
      TradeDate,
      SimulatePaid,
    } = req.body;

    Payment_result.create({
      MerchantID,
      MerchantTradeNo,
      StoreID,
      RtnCode,
      RtnMsg,
      TradeNo,
      TradeAmt,
      PaymentDate,
      PaymentType,
      PaymentTypeChargeFee,
      TradeDate,
      SimulatePaid,
    });
  },
};

module.exports = paymentController;
