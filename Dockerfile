# Production image, copy all the files and run next
FROM node:20

WORKDIR /app
COPY . .

ENV NEXT_PUBLIC_STRAPI_API 'https://ergo-platform-cms-nvbpfiue6q-ez.a.run.app'

RUN npm install -g npm@6
RUN npm install
RUN npm run build

ENV NODE_ENV production

EXPOSE 3000


# CMD ["yarn", "start"]
ENTRYPOINT ["sh", "/app/entrypoint.sh"]

CMD ["npm", "run", "start"]