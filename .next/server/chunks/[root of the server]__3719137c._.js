module.exports = {

"[project]/.next-internal/server/app/api/client/webhook/connection-update/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/repositories/client/index.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ClientRepository": (()=>ClientRepository)
});
class ClientRepository {
    clientModel;
    connect;
    constructor(clientModel, connect){
        this.clientModel = clientModel;
        this.connect = connect;
        this.connect();
    }
    async upsert(client) {
        try {
            const filter = {
                telephone: client.telephone
            };
            const options = {
                upsert: true,
                new: true
            };
            const updatedClient = await this.clientModel.findOneAndUpdate(filter, client, options);
            return updatedClient;
        } catch (error) {
            throw new Error('Client not created or updated!', {
                cause: error
            });
        }
    }
    async getByTelephone(telephone) {
        try {
            const client = await this.clientModel.findOne({
                telephone
            });
            if (!client) throw new Error('Client not found!');
            return client;
        } catch (error) {
            const errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }
    async deleteByTelephone(telephone) {
        try {
            const response = await this.clientModel.deleteOne({
                telephone
            });
            if (response.deletedCount === 0) throw new Error('None deleted!');
        } catch  {
            throw new Error('It was not possible delete user by db!');
        }
    }
    async decrementClientTokens(clientId) {
        try {
            const response = await this.clientModel.updateOne({
                _id: clientId
            }, {
                $inc: {
                    messageTokens: -1
                }
            });
            if (response.modifiedCount === 0) throw new Error('None updated!');
        } catch  {
            throw new Error('It was not possible decrement user tokens!');
        }
    }
    async incrementClientTokens(clientId, qty) {
        try {
            const response = await this.clientModel.updateOne({
                _id: clientId
            }, {
                $inc: {
                    messageTokens: qty
                }
            });
            if (response.modifiedCount === 0) throw new Error('None updated!');
        } catch  {
            throw new Error('It was not possible increment user tokens!');
        }
    }
}
}}),
"[externals]/mongoose [external] (mongoose, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/src/app/api/repositories/client/models/client.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const ClientSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    telephone: {
        type: String,
        required: true
    },
    authCode: {
        type: String,
        required: true
    },
    messageTokens: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});
const ClientModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Client || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Client', ClientSchema);
const __TURBOPACK__default__export__ = ClientModel;
}}),
"[project]/src/constants.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AUTH_CODE_LOCAL_STORAGE_KEY": (()=>AUTH_CODE_LOCAL_STORAGE_KEY),
    "COLORS": (()=>COLORS),
    "ENVS": (()=>ENVS),
    "TELEPHONE_LOCAL_STORAGE_KEY": (()=>TELEPHONE_LOCAL_STORAGE_KEY)
});
const ENVS = {
    evolutionBaseUrl: process.env.EVOLUTION_BASE_URL,
    evolutionApiKey: process.env.EVOLUTION_API_KEY,
    mongoUrl: process.env.MONGO_URL,
    webhookSendMessageUrl: process.env.WEBHOOK_SEND_MESSAGE_URL,
    openAiBaseUrl: process.env.OPEN_AI_BASE_URL,
    openAiApiKey: process.env.OPEN_AI_API_KEY,
    stripeCallbackUrl: process.env.STRIPE_CALLBACK_URL,
    stripeApiCompleteKey: process.env.STRIPE_API_COMPLETE_KEY,
    stripePriceKey: process.env.STRIPE_PRICE_KEY
};
const AUTH_CODE_LOCAL_STORAGE_KEY = 'AUTH_CODE_LOCAL_STORAGE_KEY';
const TELEPHONE_LOCAL_STORAGE_KEY = 'TELEPHONE_LOCAL_STORAGE_KEY';
const COLORS = {
    main: '#009CFF',
    mainLow: '#9DD9FF',
    red: '#FF0000'
};
}}),
"[project]/src/app/api/infra/mongoDb/index.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "connectDB": (()=>connectDB)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
;
const MONGO_URI = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENVS"].mongoUrl;
if (!MONGO_URI) {
    throw new Error('⚠️ MONGO_URI não foi definida no .env');
}
const connectDB = async ()=>{
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connection.readyState >= 1) {}
    await __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGO_URI);
};
}}),
"[project]/src/app/api/client/webhook/connection-update/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$repositories$2f$client$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/repositories/client/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$repositories$2f$client$2f$models$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/repositories/client/models/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$infra$2f$mongoDb$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/infra/mongoDb/index.ts [app-route] (ecmascript)");
;
;
;
;
const clientRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$repositories$2f$client$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ClientRepository"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$repositories$2f$client$2f$models$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$infra$2f$mongoDb$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"]);
async function POST(req) {
    try {
        const body = await req.json();
        const client = await clientRepository.getByTelephone(body.instance);
        console.log(body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({}, {
            status: 400
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Nenhum dado enviado!'
        }, {
            status: 400
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__3719137c._.js.map