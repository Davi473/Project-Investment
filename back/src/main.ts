//=============================
// Http Server
//=============================
import { HttpServerAdaptorExpress } from "./infrastructure/http/HttpServer";

const HTTP = new HttpServerAdaptorExpress();
const PORT = 3000;
//=============================
// User Controller
//=============================
import { UUIDGeneratorImpl } from "./domain/vo/UUIDGeneratorImpl";
import { PasswordHasherImpl } from "./domain/vo/PasswordHasherImpl";
import { InMemoryUserRepository } from "./infrastructure/repositories/InMemoryUserRepository";
import { RegisterUser } from "./application/usecase/user/RegisterUser";
import { LoginUser } from "./application/usecase/user/LoginUser";
import UserController from "./infrastructure/controllers/UserController";

const uuidGen = new UUIDGeneratorImpl();
const passwordHasher = new PasswordHasherImpl();
const userRepository = new InMemoryUserRepository();

const registerUser = new RegisterUser(uuidGen, passwordHasher, userRepository);
const loginUser = new LoginUser(passwordHasher, userRepository);

const userController = new UserController(registerUser, loginUser);
HTTP.registerRoutes(userController);

//=============================
// QR Code Controller
//=============================
import GenerateTotpSecret from "./application/usecase/qrCode/GenerateTotpSecret";
import QrCodeController from "./infrastructure/controllers/QrCodeController";
import Authenticator from "./application/usecase/qrCode/Authenticator";

const generateTotpSecret = new GenerateTotpSecret(userRepository);
const authenticator = new Authenticator(userRepository);
const qrCodeController = new QrCodeController(generateTotpSecret, authenticator);
HTTP.registerRoutes(qrCodeController);

//=============================
// Wallet Controller
//=============================
import { InMemoryWalletInvestmentRepository } from "./infrastructure/repositories/InMemoryWalletInvestmentRepository";
import { CreateUseCase } from "./application/usecase/walletInvestiment/CreateUseCase";
import { GetUseCase } from "./application/usecase/walletInvestiment/GetUseCase";
import WalletController from "./infrastructure/controllers/WalletController";

const walletInvestmentRepository = new InMemoryWalletInvestmentRepository()
const walletUseCase = new CreateUseCase(walletInvestmentRepository, uuidGen);
const getWalletUseCase = new GetUseCase(walletInvestmentRepository);
const walletController = new WalletController(walletUseCase, getWalletUseCase);
HTTP.registerRoutes(walletController);

HTTP.listen(PORT);

