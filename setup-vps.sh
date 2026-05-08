#!/bin/bash
set -e

DOMAIN="egodragon.sedx3d.com"
EMAIL="essadik18.39@gmail.com"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Starting app on HTTP (port 80)..."
docker compose up -d --build

echo "==> Waiting for nginx to be ready..."
sleep 3

echo "==> Running certbot to obtain SSL certificate..."
docker compose run --rm certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN"

echo "==> Switching nginx to SSL config..."
cp "$DIR/nginx-ssl.conf" "$DIR/nginx.conf"

echo "==> Restarting app with SSL..."
docker compose restart app

echo "Done! Your app is live at https://$DOMAIN"
