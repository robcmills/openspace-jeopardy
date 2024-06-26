#!/bin/bash
set -e

yum update -y
yum install -y unzip

echo "Installing bun..."
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL="$HOME/.bun"
export PATH=$BUN_INSTALL/bin:$PATH

cd client
echo "Installing client dependencies..."
bun install
echo "Building client..."
bun run build

cd ../server
echo "Installing server dependencies..."
bun install
echo "Starting server..."
bun run index.ts
