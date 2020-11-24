'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Payment_result.init({
    MerchantID: DataTypes.STRING,
    MerchantTradeNo: DataTypes.STRING,
    StoreID: DataTypes.STRING,
    RtnCode: DataTypes.STRING,
    RtnMsg: DataTypes.STRING,
    TradeNo: DataTypes.STRING,
    TradeAmt: DataTypes.INTEGER,
    PaymentDate: DataTypes.STRING,
    PaymentType: DataTypes.STRING,
    PaymentTypeChargeFee: DataTypes.INTEGER,
    TradeDate: DataTypes.STRING,
    SimulatePaid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment_result',
  });
  return Payment_result;
};