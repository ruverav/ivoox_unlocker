## iVoox Unlocker

This little application lets you consume audios from protected podcasts from iVoox.

### How to run it with Node (relative to root folder):

```bash
$ cd app
$ npm install -y
$ npm start
```

### How to run it with Docker (relative to root folder):

```bash
$ docker build -t ivoox_unlocker .
$ docker run --name ivoox_unlocker -p 3000:3000 -d ivoox_unlocker
```

### Optional

Use an Nginx proxy to redirect port 3000 to port 80 for an specific domain.
