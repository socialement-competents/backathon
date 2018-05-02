FROM keymetrics/pm2:8-alpine
WORKDIR /var/www

COPY . .

ENV KEYMETRICS_PUBLIC=m1cgmqibbhlibom
ENV KEYMETRICS_SECRET=yl5lvcryikz8p9h
ENV SESSION_SECRET=tennisifyprod

RUN npm install --production

EXPOSE 3000

CMD ["pm2-runtime", "--json", "process.yml", "--web", "--only", "webserver"]
