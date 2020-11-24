'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payment_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MerchantID: {
        type: Sequelize.STRING
      },
      MerchantTradeNo: {
        type: Sequelize.STRING
      },
      StoreID: {
        type: Sequelize.STRING
      },
      RtnCode: {
        type: Sequelize.STRING
      },
      RtnMsg: {
        type: Sequelize.STRING
      },
      TradeNo: {
        type: Sequelize.STRING
      },
      TradeAmt: {
        type: Sequelize.INTEGER
      },
      PaymentDate: {
        type: Sequelize.STRING
      },
      PaymentType: {
        type: Sequelize.STRING
      },
      PaymentTypeChargeFee: {
        type: Sequelize.INTEGER
      },
      TradeDate: {
        type: Sequelize.STRING
      },
      SimulatePaid: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Payment_results');
  }
};