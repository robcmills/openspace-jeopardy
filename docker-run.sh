docker run --rm -it \
  -v "$(pwd):/app" \
  -v /app/client/node_modules \
  --workdir /app \
  node:18-alpine \
  sh -c "apk add --no-cache bash curl && bash prod.sh"
