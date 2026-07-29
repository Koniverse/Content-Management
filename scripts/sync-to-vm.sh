#!/bin/bash
# ── Rsync content-management backups / source sang VM via PEM ────────────────
set -e

VM_IP="192.168.10.99"
VM_USER="${VM_USER:-root}"
VM_PATH="${VM_PATH:-/root/content-management}"
SSH_KEY="${SSH_KEY:-./migration.pem}"

RSH_CMD="ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no"

case "${1:-help}" in
  backup|b)
    echo "🔄 Syncing backups/ to ${VM_USER}@${VM_IP}:${VM_PATH}/backups/ ..."
    rsync -avzP --mkpath --rsh="${RSH_CMD}" \
      ./backups/ "${VM_USER}@${VM_IP}:${VM_PATH}/backups/"
    ;;

  source|s)
    echo "🔄 Syncing project (exclude node_modules, .cache, .tmp, .git) to ${VM_USER}@${VM_IP}:${VM_PATH}/ ..."
    rsync -avzP --mkpath --rsh="${RSH_CMD}" \
      --exclude='node_modules' \
      --exclude='.cache' \
      --exclude='.tmp' \
      --exclude='.git' \
      --exclude='dist' \
      --exclude='*.tar.gz' \
      ./ "${VM_USER}@${VM_IP}:${VM_PATH}/"
    ;;

  all|a)
    echo "🔄 Syncing everything to ${VM_USER}@${VM_IP}:${VM_PATH}/ ..."
    rsync -avzP --mkpath --rsh="${RSH_CMD}" \
      --exclude='node_modules' \
      --exclude='.cache' \
      --exclude='.tmp' \
      --exclude='.git' \
      --exclude='dist' \
      --exclude='*.tar.gz' \
      ./ "${VM_USER}@${VM_IP}:${VM_PATH}/"
    echo ""
    echo "🔄 Syncing backups/ ..."
    rsync -avzP --mkpath --rsh="${RSH_CMD}" \
      ./backups/ "${VM_USER}@${VM_IP}:${VM_PATH}/backups/"
    ;;

  docker-compose|dc)
    echo "📄 Syncing docker-compose + Dockerfile + .env to ${VM_USER}@${VM_IP}:${VM_PATH}/ ..."
    rsync -avzP --mkpath --rsh="${RSH_CMD}" \
      docker-compose.yml \
      docker-compose.preview.yml \
      Dockerfile.preview \
      .env \
      "${VM_USER}@${VM_IP}:${VM_PATH}/"
    ;;

  help|*)
    echo "Usage: bash scripts/sync-to-vm.sh [command]"
    echo ""
    echo "Commands:"
    echo "  backup | b        Sync backups/ folder to VM"
    echo "  source | s        Sync project source (no node_modules/.cache/.git)"
    echo "  all    | a        Sync source + backups"
    echo "  docker-compose | dc  Sync compose files + .env"
    echo ""
    echo "Env vars:"
    echo "  VM_USER=root       SSH user (default: root)"
    echo "  VM_PATH=/path      Destination path on VM (default: /root/content-management)"
    echo "  SSH_KEY=./key.pem  Path to PEM file (default: ./migration.pem)"
    echo ""
    echo "Examples:"
    echo "  bash scripts/sync-to-vm.sh source"
    echo "  SSH_KEY=~/.ssh/id_rsa bash scripts/sync-to-vm.sh all"
    echo "  VM_USER=ubuntu VM_PATH=/opt/strapi SSH_KEY=./prod.pem bash scripts/sync-to-vm.sh backup"
    ;;
esac
