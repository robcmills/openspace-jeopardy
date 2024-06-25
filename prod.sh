#!/bin/bash

echo "Installing bun..."
curl -fsSL https://bun.sh/install | bash

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
