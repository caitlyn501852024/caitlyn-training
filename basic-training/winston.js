// 安裝完後，引入套件
import winston from "winston";

const logger = winston.createLogger({
  level: 'info', // 未指定等級時，預設使用 info 等級
  format: winston.format.json(), // 輸出格式
  defaultMeta: {service: 'user-service'},
  transports: [
    // error 或以上等級的錯誤，寫入 error.log 檔案中
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    // info 或以上等級的訊息，寫入 combined.log 檔案中
    new winston.transports.File({filename: 'combined.log'}),
  ],
});

// 不在產品 (production) 環境時，也將 log 訊息輸出到 console 中
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// 底下即可自由設定呼叫使用各種 log
logger.log('info', 'hello winston');
logger.error('there is an error');

logger.log({
  level: 'info',
  message: 'info123',
})