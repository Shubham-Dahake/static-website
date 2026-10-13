# BrightPath — Colorful Education Website

A responsive, colorful static education website built with **HTML, CSS, and vanilla JavaScript**. It includes course cards, category filters, a responsive mobile menu, learning steps, and CTA sections.

## Project files

```text
brightpath-education-site/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Download or clone this project.
2. Open `index.html` in your browser.

No build tools, backend, or database are required.

## Deploy on AWS EC2 with Nginx (Amazon Linux)

### 1. Launch your EC2 instance
- Launch an Amazon Linux EC2 instance.
- In the security group, allow inbound **HTTP (port 80)** from the audience you intend to serve. Allow SSH (port 22) only from your own IP where possible.

### 2. Connect to the instance and install Nginx

```bash
sudo dnf update -y
sudo dnf install nginx git -y
sudo systemctl enable --now nginx
```

### 3. Upload your website

**Option A — Clone from GitHub**

First push this project folder to your own GitHub repository, then run:

```bash
cd /tmp
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
sudo mkdir -p /usr/share/nginx/html/brightpath
sudo cp -r YOUR-REPOSITORY/* /usr/share/nginx/html/brightpath/
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your actual GitHub details.

**Option B — Copy files over SSH/SCP**

From your local computer, copy `index.html`, `style.css`, and `script.js` to the EC2 instance, then place them in `/usr/share/nginx/html/brightpath/`.

### 4. Configure Nginx

Create a small server configuration:

```bash
sudo nano /etc/nginx/conf.d/brightpath.conf
```

Paste:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html/brightpath;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Save the file, test the configuration, and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

If the default Nginx welcome page is still configured as the active server for port 80, remove or disable the conflicting default configuration before reloading.

### 5. Open the website

Visit this address in your browser:

```text
http://YOUR-EC2-PUBLIC-IP/
```

Use the public IPv4 address of your EC2 instance. If the site does not load, check the EC2 security group, Nginx status, and configuration.

## Notes

- This is a **static website**: no PHP, database, or server-side processing is used.
- Course buttons show a demo toast; they do not enroll users or send data to a server.
- Google Fonts are loaded from the internet. System fallback fonts will be used if external fonts are unavailable.
