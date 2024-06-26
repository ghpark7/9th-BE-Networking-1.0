const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');
const propertiesRouter = require('./routes/properties');
const { sequelize } = require('./models');
const { readAndSaveExcelData } = require('./models/excel');
const db = require('./models/index');

const app = express();
app.set('port', process.env.PORT || 8007);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
db.sequelize.sync().then(async () => {
    console.log('데이터베이스 연결 성공');
    await readAndSaveExcelData(); // 엑셀 데이터를 데이터베이스에 저장
}).catch((err) => {
    console.error(err);
    console.log('데이터베이스 연결 에러');
    process.exit();
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use('/', pageRouter);
app.use('/api/properties', propertiesRouter);
app.use((req, res, next) => { // 404 NOT FOUND
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => { // 500 ERROR
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});