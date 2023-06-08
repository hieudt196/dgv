# Sử dụng Node.js image như làm base image
FROM node:16.20.0

# Tạo thư mục /app và làm thư mục hiện tại
WORKDIR /app

# Copy package.json và package-lock.json vào /app
COPY package*.json ./

# Cài đặt các dependencies cho ứng dụng
RUN npm install


# Copy tất cả các file còn lại vào /app
COPY . .

VOLUME /app/logs
# Cài đặt PM2

RUN npm install phantomjs-prebuilt
RUN npm install -g pm2

# Chạy ứng dụng bằng PM2

CMD ["pm2-runtime", "report.js"]