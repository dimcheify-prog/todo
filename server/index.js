import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const app = jsonServer.create();
const router = jsonServer.router('db.json');

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

app.use(function(req, res, next){
    setTimeout(next, 500);
});

app.db = router.db;

const rules = auth.rewriter({
    users: 600,
    tasks: 600,
});

app.use(rules);
app.use(auth);
app.use(router);
app.listen(8000);