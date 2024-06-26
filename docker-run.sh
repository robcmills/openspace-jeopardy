docker run --rm -it \
  -v "$(pwd):/app" \
  -v /app/client/node_modules \
  -p 3000:3000 \
  --workdir /app \
  --ulimit memlock=-1:-1 \
  oven/bun \
  bash -c "./prod.sh"


# Vercel image
# docker run --rm -it \
#   -v "$(pwd):/app" \
#   -v /app/client/node_modules \
#   --workdir /app \
#   amazonlinux:2023.2.20231011.0 \
#   bash -c "yum update -y && yum install -y unzip && bash ./prod.sh"
