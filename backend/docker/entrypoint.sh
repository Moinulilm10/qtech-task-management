#!/bin/sh
set -e

echo "🚀 Starting Laravel deployment..."

# ---- Clean environment ----
# Ensure we are using the most up-to-date configuration
# (Laravel prioritizes OS env vars over .env file values)
php artisan config:clear

# ---- Generate app key if not set ----
if [ -z "$APP_KEY" ]; then
    echo "⚙️  Generating application key..."
    php artisan key:generate --force
fi

# ---- Update Nginx port from Render's PORT env ----
if [ -n "$PORT" ]; then
    echo "🔧 Configuring Nginx to listen on port $PORT..."
    sed -i "s/listen 8080/listen $PORT/g" /etc/nginx/http.d/default.conf
    sed -i "s/listen \[::\]:8080/listen [::]:$PORT/g" /etc/nginx/http.d/default.conf
fi

# ---- Cache configuration for performance ----
echo "📦 Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# ---- Run database migrations ----
echo "🗃️  Running database migrations..."
php artisan migrate --force

# ---- Create storage symlink ----
php artisan storage:link --force 2>/dev/null || true

echo "✅ Laravel is ready! Handing off to Supervisor..."

# ---- Execute the CMD ----
exec "$@"
