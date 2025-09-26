//=============================
// Http Server And Settings
//=============================
import { HttpServerAdaptorExpress } from "./infrastructure/http/HttpServer";
import { UUIDGeneratorImpl } from "./domain/vo/UUIDGeneratorImpl";
import { PasswordHasherImpl } from "./domain/vo/PasswordHasherImpl";
const HTTP = new HttpServerAdaptorExpress();
const PORT = 3000;
const uuidGen = new UUIDGeneratorImpl();
const passwordHasher = new PasswordHasherImpl();
//=============================
// User Controller
//=============================

import { InMemoryUserRepository, InJSONUserRepository } from "./infrastructure/repositories/InMemoryUserRepository";
import { RegisterUser } from "./application/usecase/user/RegisterUser";
import { LoginUser } from "./application/usecase/user/LoginUser";
import UserController from "./infrastructure/controllers/UserController";
const userRepository = new InMemoryUserRepository();
const registerUser = new RegisterUser(uuidGen, passwordHasher, userRepository);
const loginUser = new LoginUser(passwordHasher, userRepository);
const userController = new UserController(registerUser, loginUser);
HTTP.registerRoutes(userController);

//=============================
// QR Code Controller
//=============================
// import GenerateTotpSecret from "./application/usecase/qrCode/GenerateTotpSecret";
// import QrCodeController from "./infrastructure/controllers/QrCodeController";
// import Authenticator from "./application/usecase/qrCode/Authenticator";

// const generateTotpSecret = new GenerateTotpSecret(userRepository);
// const authenticator = new Authenticator(userRepository);
// const qrCodeController = new QrCodeController(generateTotpSecret, authenticator);
// HTTP.registerRoutes(qrCodeController);

//=============================
// Wallet Controller
//=============================
import { InMemoryWalletRepository, InJSONWalletRepository } from "./infrastructure/repositories/InMemoryWalletRepository";
import { CreateUseCase } from "./application/usecase/wallet/CreateUseCase";
import { GetUseCase } from "./application/usecase/wallet/GetUseCase";
import WalletController from "./infrastructure/controllers/WalletController";
const walletRepository = new InMemoryWalletRepository()
const walletUseCase = new CreateUseCase(walletRepository, uuidGen);
const getWalletUseCase = new GetUseCase(walletRepository);
const walletController = new WalletController(walletUseCase, getWalletUseCase);
HTTP.registerRoutes(walletController);

//=============================
// Investment Controller
//=============================
import { InMemoryInvestmentRepository, InJSONInvestmentRepository } from "./infrastructure/repositories/InMemoryInvestmentRepository";
import { SaveUseCase } from "./application/usecase/Investment/SaveUseCase";
import { GetUseCase as InvestmentGetUseCase } from "./application/usecase/Investment/GetUseCase";
import InvestmentController from "./infrastructure/controllers/InvestmentController";
const investmentRepository = new InMemoryInvestmentRepository();
const saveInvestmentUseCase = new SaveUseCase(uuidGen, investmentRepository);
const getInvestmentUseCase = new InvestmentGetUseCase(investmentRepository);
const investmentController = new InvestmentController(saveInvestmentUseCase, getInvestmentUseCase);
HTTP.registerRoutes(investmentController);

//=============================
// Account Controller
//=============================
import { InMemoryAccountRepository } from "./infrastructure/repositories/InMemoryAccountRepository";
import { CreateUseCase as AccountCreateUseCase } from "./application/usecase/account/CreateUseCase";
import { GetUseCase as AccountGetUseCase } from "./application/usecase/account/GetUseCase";
import AccountController from "./infrastructure/controllers/AccountController";
const accountRepository = new InMemoryAccountRepository();
const createAccountUseCase = new AccountCreateUseCase(accountRepository, uuidGen);
const getAccountUseCase = new AccountGetUseCase(accountRepository);
const accountController = new AccountController(createAccountUseCase, getAccountUseCase);
HTTP.registerRoutes(accountController);

HTTP.listen(PORT);

