#!/bin/bash
set -e

echo "Installing dependencies..."
bun install

echo "Starting server..."
bun run server
