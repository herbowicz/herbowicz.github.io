---
layout: single
comments: true
title: 'Get your free SSL certificate in 10 easy steps'
Category: Tutorial
tags: [SSL]
lang: en-EN
---

Google [announced](https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html) SSL is mandatory in 2017. 
All sites without SSL now see a "Not secure" warning, which is really distracting.
You can buy your SSL certificate or get it for free from [Let's Encrypt](https://letsencrypt.org/).
In boils down to writing just one line of code:
```
letsencrypt certonly --manual -d yourdomain.com
```

However, there are some prerequisites to be met, and the way how the whole process is described at the official site makes many people confused. 
So here is the shortest description, the easiest way to get a free SSL certificate:

1. It won't work on Windows.
Try with Linux instead. You can install Ubuntu [alongside](https://www.tecmint.com/install-ubuntu-16-04-alongside-with-windows-10-or-8-in-dual-boot/) with Windows.

2. Download and install Let’s Encrypt client:
```
git clone https://github.com/letsencrypt/letsencrypt
```

3. Now it's time to get your free SSL certificate. As admin (sudo -i) put your domain name (instead of yourdomain.com)
```
letsencrypt certonly --manual -d yourdomain.com
```

4. Provide your email address and agree to the Terms of Service. 
To verify that you are the owner of this domain, you will have to upload one specific file (without extention) before continuing. Make sure your web server displays the following content at:
```
http://yourdomain.com/.well-known/acme-challenge/1234567890-long-line-of-characters-1234567890 

12345678901234567890-even-longer-line-of-characters-123456789012345678901234567890
```

5. Press continue and you should see a message like this:
```
- Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/yourdomain.com/fullchain.pem. Your cert will
   expire on 2017-0x-xx. To obtain a new version of the certificate in
   the future, simply run Let's Encrypt again.
```

6. Go to that folder:
```
cd etc/letsencrypt/live/yourdomain.com
```

7. You will need openssl to open your certificate and private key:
```
apt-get install openssl
```

8. Obtain your certificate:
```
openssl x509 -in fullchain.pem -text
```
And get your private key:
```
openssl rsa -in privkey.pem -text
```

9. Copy both. If you have access the cPanel, go to SSL/TLS Manager. Click on Generate, view, upload, or delete your private keys, and paste them there.

10. That should work and you will see your website using SSL: https://yourdomain.com
Optionally, you can redirect all your trafic to SSL connection. Modify .httacces file:

```
RewriteEngine On
RewriteCond %{HTTP_HOST} ^yourdomain.com [NC]
RewriteCond %{SERVER_PORT} 80
RewriteRule ^(.*)$ https://yourdomain.com/$1 [R,L]

RewriteEngine On
RewriteCond %{HTTP_HOST} ^www.yourdomain.com [NC]
RewriteCond %{SERVER_PORT} 80
RewriteRule ^(.*)$ https://yourdomain.com/$1 [R,L]
```


Hope you enjoy it. Let me know if you succeeded with your free SSL certificate.

