// Email 


// Notification

// OTP 

export const generateOtp = () => {
    const otp = Math.floor(100000+Math.random()*900000);
    let expiry = new Date();

    expiry.setTime(new Date().getTime() + (30*60*1000));

    return { otp, expiry };
}

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    const accountSid = "AC7275dd3e6e7bb9ea1d3ca7a33c40f26c";
    const authToken = "c556b6081df280ab187369ca8293e095";
    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `Ma So OTP cua ban ${otp}`,
        from: '+12059520651',
        to: `+84${toPhoneNumber}`
    });

    return response;
}

// Payment notification or emails+12059520651
