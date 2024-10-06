const nodemailer = require('nodemailer');

export default async function (req, res) {
    if (req.method === 'POST') {
        const { email, subject, message } = req.body;

        // 创建邮件发送者 (使用 QQ 邮箱的 SMTP)
        let transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            port: 465,
            secure: true, // 使用 SSL
            auth: {
                user: '1410430051@qq.com', // QQ 邮箱
                pass: 'xxmarmxsizicgchj' // QQ 邮箱的授权码（而不是登录密码）
            }
        });

        // 配置邮件选项
        let mailOptions = {
            from: '"Your Name" <1410430051@qq.com>', // 发件人地址
            to: email, // 收件人地址
            subject: subject, // 邮件主题
            text: message // 邮件内容
        };

        // 发送邮件
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: '邮件发送成功' });
        } catch (error) {
            res.status(500).json({ message: '邮件发送失败', error: error.toString() });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
