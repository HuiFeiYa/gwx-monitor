var Koa = require("koa");
var Router = require("koa-router");
const koaBody = require("koa-body");
const cors = require("koa2-cors");
var app = new Koa();
var router = new Router();
app.use(cors());
app.use(
    koaBody({
        multipart: true,
    })
);
router.get("/", (ctx) => {
    console.log(ctx.request.url);
    ctx.response.body = 1;
});
router.get("/index", (ctx) => {
    console.log(ctx.request.url);
    ctx.body = {
        status: 200,
        responseType: "success",
        response: {
            msg: "成功",
        },
    };
});
router.post("/user", (ctx) => {
    console.log("user", ctx.request.body);
    ctx.body = "user";
});
router.post("/track", (ctx) => {
    ctx.body = {
        status: 200,
        responseType: "success",
        response: {
            msg: "track result",
        },
    };
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log("listen 4000");
});
