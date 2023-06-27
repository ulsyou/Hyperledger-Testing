const app = require('../asset-app/routers/student');

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
