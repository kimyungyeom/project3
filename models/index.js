// sequelize모듈 가져오기
const Sequelize = require('sequelize');
// NODE_ENV 환경변수를 가져오는데 값이 존재하지 않다면 development를 기본값으로 사용
const env = process.env.NODE_ENV || 'development';
// config.js 가져오기 
const config = require('../config/config.js')[env];

// 유저 및 상품 모델 불러오기
const User = require('./user');
const Products = require('./products.schema.js');

// 객체 생성 및 설정
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

// 유저 및 상품의 Sequelize 모델 초기화
User.init(sequelize);
Products.init(sequelize);

// db모듈 내보내기
module.exports = db;
