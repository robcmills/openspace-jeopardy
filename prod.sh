#!/bin/bash
set -e

echo "Installing dependencies..."
bun install

echo "Building client..."
bun run build

echo "Starting server..."
bun run server
