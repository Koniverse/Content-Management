#!/bin/bash
# ── Backup PostgreSQL database (content-management) ──────────────────────────
set -e

CONTAINER="content-management-postgres-1"
DB_USER="strapi"
DB_NAME="strapi"
BACKUP_DIR="${BACKUP_DIR:-./backups}"

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILENAME="${BACKUP_DIR}/strapi_${TIMESTAMP}.sql.gz"

echo "🔄 Backing up ${DB_NAME} from ${CONTAINER} ..."
docker exec -t "$CONTAINER" pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$FILENAME"

# Kiểm tra file backup
if [ -f "$FILENAME" ]; then
  SIZE=$(du -h "$FILENAME" | cut -f1)
  echo "✅ Backup done: ${FILENAME} (${SIZE})"
else
  echo "❌ Backup failed!"
  exit 1
fi
