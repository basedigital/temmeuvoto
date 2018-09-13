let Config = {
    CEREBRAL_DEBUGGER:'192.168.0.105:8585',
    // CEREBRAL_DEBUGGER:'10.0.0.129:8585',
    ENDPOINT: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '',
    RECAPTCHA:"6LfUpmgUAAAAACRgPcQRXjCghb1U6d3Cqh1-J43G"
};

export default Config;
