/* eslint no-console: 0 */

import express from 'express';
import playground from 'playground';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use('/playground', playground);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
