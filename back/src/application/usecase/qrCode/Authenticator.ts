import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { UserRepository } from '../../repositories/UserRepository';
import UseCase from '../UseCase';
import { Email } from '../../../domain/vo/Email';

export default class Authenticator implements UseCase 
{
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(input: Input): Promise<any> 
    {
        const {code, email} = input;
        
        const existingSecret = await this.userRepository.findByEmail(new Email(email));
        if (existingSecret === null) throw new Error("Usuário não encontrado");
        if (existingSecret.totpSecret) throw new Error("2FA já está configurado");
        const secret: any = speakeasy.generateSecret({
            name: `Wallet (${existingSecret.nickname})`
        });
        try {
            existingSecret.enableTwoFactorAuth(secret.base32);
            await this.userRepository.save(existingSecret);
            const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url);
            return {
                qrCode: qrCodeDataURL,
                secret: secret.base32,
            };
        } catch (err) {
            throw new Error("Erro ao gerar QR code");
        }
    }
}

type Input = {
  code: string;
  email: string;
};