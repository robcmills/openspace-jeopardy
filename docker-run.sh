docker run --rm -it \
  -e PRODUCTION=true \
  -v "$(pwd):/app" \
  -v /app/node_modules \
  -p 80:3000 \
  -p 443:443 \
  --workdir /app \
  --ulimit memlock=-1:-1 \
  --name app \
  oven/bun \
  bash -c "./prod.sh"
