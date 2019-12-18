import express from 'express';

const server = express();
export default server;

const PORT = process.env.PORT || 3000;
let isBuilt = false;

const done = () => {
  !isBuilt
    && server.listen(PORT, () => {
      isBuilt = true;
      console.log(
        `Server listening on http://localhost:${PORT} in ${
          process.env.NODE_ENV
        }`
      );
    });
};

done();
