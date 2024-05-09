const Sequelize = require('sequelize');
const config = require('../config/config.json')['development'];
const Property = require('./property');
const XLSX = require('xlsx');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

Property.initiate(sequelize);

// 엑셀 파일 읽기
const workbook = XLSX.readFile('매물_정보.xlsx');
const sheet_name_list = workbook.SheetNames;
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// 데이터베이스에 데이터 저장
data.forEach(async (row) => {
  await Property.create({
      postalCode: row['우편번호'],
      roadAddress: `${row['시도']} ${row['시군구']} ${row['도로명']} ${row['건물번호 본번']}-${row['건물번호 부번']}`,
      jibunAddress: `${row['시도']} ${row['시군구']} ${row['법정동명']} ${row['지번본번']}-${row['지번부번']}`
  });
});

const db = {
    sequelize,
    Sequelize,
    Property
};

module.exports = db;