#!/bin/bash
set -e

DOMAIN="egodragon.sedx3d.com"
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"

echo "==> Installing nginx and certbot..."
apt-get update -y
apt-get install -y nginx certbot python3-certbot-nginx

echo "==> Copying nginx config..."
cp "$(dirname "$0")/egodragon.nginx.conf" "$NGINX_CONF"
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/

echo "==> Testing nginx config..."
nginx -t

echo "==> Starting/enabling nginx..."
systemctl enable --now nginx
systemctl restart nginx

echo "==> Obtaining SSL certificate via certbot..."
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --redirect -m essadik18.39@gmail.com

echo "==> Restarting nginx after SSL..."
systemctl restart nginx

echo "Done! Your app is live at https://$DOMAIN"
