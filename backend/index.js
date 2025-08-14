const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // ✅ 반드시 .env 로드

const app = express();
const PORT = process.env.PORT || 3000;

// 📌 CORS & Body-parser 세팅
app.use(cors());
app.use(express.json());

// 📌 MongoDB 연결 (환경변수 미설정 대비 처리)
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI 환경변수가 설정되지 않았습니다. .env 파일을 확인하세요.");
    process.exit(1); // 서버 종료
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ mongodb 연결 성공"))
    .catch((err) => console.error("❌ 연결 실패", err));

// 📌 라우터 연결
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

// 테스트용 라우트
app.get('/', (req, res) => {
    res.send("Hello Express!");
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 Server is Running on port ${PORT}`);
});
