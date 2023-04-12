const fs=require('fs')
const rfs=require('rotating-file-stream')
const path=require('path')
const logdirectory=path.join(__dirname,'../production_logs')
fs.existsSync(logdirectory) || fs.mkdirSync(logdirectory)
const accesslogstream=rfs.createStream('access.log',{
    interval:'1d',
    path:logdirectory
})
const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'poonam.pc1112',
            pass: 'rncrlckckwbeumeo'
        }
    },
        google_client_id:"200500373000-o0i8o5oqb3r1cun5ql1m7a6kces478r6.apps.googleusercontent.com",
        google_client_secret:"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",
        google_call_back_url:"http://localhost:8000/users/auth/google/callback",
        jwt_secret:"codeial",
        morgan:{
            mode:'dev',
            options:{stream:accesslogstream}
        }
}
const production={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
        google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
        google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
        google_call_back_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
        jwt_secret:process.env.CODEIAL_JWT_SECRET,
        morgan:{
            mode:'combined',
            options:{stream:accesslogstream}
        }
}
if (process.env.NODE_ENV == "production") {
    module.exports = production;
  } else {
    module.exports = development;
  }