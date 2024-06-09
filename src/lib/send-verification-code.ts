import {transporter} from "./transporter.js";

export async function sendVerificationCode(email: string, verificationCode: string): Promise<void> {
    const sendAddress: string = process.env.SMTP_FROM_ADDRESS || "noreply@wineseeker.net"

    await transporter.sendMail({
        from: `"와인 시커" <${sendAddress}>`, // sender address
        to: email, // list of receivers
        subject: "와인시커 이메일 인증 코드입니다", // Subject line
        html: `이메일 인증 코드는 다음과 같습니다.
<br>인증 코드: ${verificationCode}<br><br>
코드는 15분간 유효합니다<br><br>
본 이메일은 발신용 이메일로 회신하지 않습니다.`, // html body
    });
}