docker run --rm -it \
  -e PRODUCTION=true \
  -v "$(pwd):/app" \
  -v /app/client/node_modules \
  -v /app/server/node_modules \
  -p 80:3000 \
  -p 443:443 \
  --workdir /app \
  --ulimit memlock=-1:-1 \
  oven/bun \
  bash -c "./prod.sh"
