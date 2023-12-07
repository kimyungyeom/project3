// Express모듈 가져오기
const express = require("express");
// Express모듈에서 라우터 가져오기
const router = express.Router();
// jwt모듈 가져오기
const jwt = require("jsonwebtoken");
// bcrypt모듈 가져오기
const bcrypt = require("bcrypt");

const { Op } = require("sequelize");
const { User } = require("../models/index");

// 회원가입 API
router.post("/auth/reg", async (req, res) => {
	// 이메일, 닉네임, 비밀번호, 비밀번호확인을 데이터로 넘겨받음
	const { email, nickname, password, confirmPassword } = req.body;

	// 빈 곳 여부 체크
	if (!email || !nickname || !password || !confirmPassword) {
		return res.status(401).send({
			success: false,
			errorMessage: "입력란 중 비어있는 곳이 있습니다.",
		});
	}

	// 비밀번호 최소 6자 이상 및 서로 일치 여부 확인
	if (password.length < 6 || password !== confirmPassword) {
		return res.status(401).send({
			success: false,
			errorMessage: "비밀번호 최소 6자 이상이어야 하며, 비밀번호가 서로 일치해야 합니다.",
		});
	}

	// 이메일 형식 체크
	const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	if (!emailRegex.test(email)) {
		return res.status(401).send({
			success: false,
			errorMessage: "올바른 이메일 형식이 아닙니다.",
		});
	}

	// email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
	const existsUsers = await User.findAll({
		where: {
			[Op.or]: [{ email }, { nickname }],
		},
	});
	if (existsUsers.length > 0) {
		return res.status(409).send({
			success: false,
			errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
		});
	}

	// 비밀번호 hash화 시키기
	const hashingPassword = await bcrypt.hash(password, 10);

	// 이메일, 닉네임, 해시화한 비밀번호를 저장하고 회원가입 성공 시, 비밀번호를 제외 한 사용자 정보 반환.
	await User.create({ email, nickname, password: hashingPassword });
	res.status(201).json({
		success: true,
		message: "회원가입 되신 것을 축하드립니다!",
		data: { email, nickname },
	});
});

// 로그인 API
const secretKey = process.env.Secret_key;

router.post("/auth/login", async (req, res) => {
	// 이메일, 비밀번호를 데이터로 넘겨받음
	const { email, password } = req.body;

	// 해당 이메일을 가진 유저를 데이터베이스에서 찾는다.
	const user = await User.findOne({
		where: { email },
	});

	// 유저 존재 유무 확인
	if (!user) {
		return res.status(401).send({
			success: false,
			errorMessage: "해당 이메일을 가진 유저가 존재하지 않습니다.",
		});
	}

	// 비밀번호 서로 일치여부 확인
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		return res.status(401).send({
			success: false,
			errorMessage: "비밀번호가 틀렸습니다. 다시 확인해주세요.",
		});
	}

	// 로그인 성공 시 JWT AccessToken을 생성
	const accessToken = jwt.sign(
		// userId를 담고 있는 Payload
		{ userId: user.userId },
		secretKey,
		// Token 유효기한 12시간 설정
		{ expiresIn: "12h" },
	);

	// 생성한 Token 반환
	return res.status(200).json({
		success: true,
		message: "로그인 되었습니다.",
		data: { token: `Bearer ${accessToken}` },
	});
});

// router 모듈 내보내기
module.exports = router;
