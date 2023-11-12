FROM node:20-slim as init-stage

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# 启用 corepack ，零运行时依赖的 Node.js 脚本，充当 Node.js 和包管理器的桥梁，可以无需安装就使用 yarn, pnpm 和 npm
# corepack 附带在 Node.js 20.0.0 及更高版本中，但是需要手动启用
RUN corepack enable 
# RUN mkdir -p /var/www/blog.com
WORKDIR /var/www/blog.com
COPY package.json .
COPY pnpm-lock.yaml .

FROM init-stage as prod-deps
# 挂载一个临时目录缓存编译和包管理器目录
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod


FROM init-stage as build-stage
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
# 安装 git
RUN apt-get update && apt-get install -y git

COPY . .
# RUN ls
# RUN pwd
RUN pnpm run docs:build
# RUN ls ./docs/.vitepress/dist

FROM init-stage as production-stage
WORKDIR /var/www/blog.com
COPY --from=prod-deps /var/www/blog.com/node_modules /var/www/blog.com/node_modules
COPY --from=build-stage /var/www/blog.com/docs/.vitepress/dist .

COPY ./nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["node", "/app/main.js"]