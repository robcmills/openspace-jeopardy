docker run --rm -it \
  -v "$(pwd):/app" \
  -v /app/client/node_modules \
  --workdir /app \
  amazonlinux:2023.2.20231011.0 \
  bash -c "yum update -y && yum install -y unzip && bash ./prod.sh"
