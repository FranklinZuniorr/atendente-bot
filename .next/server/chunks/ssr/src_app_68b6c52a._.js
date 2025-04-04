module.exports = {

"[project]/src/app/helpers/index.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "removePhoneFormatting": (()=>removePhoneFormatting),
    "setClientGlobalStateRedux": (()=>setClientGlobalStateRedux)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$auth$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/auth/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$redux$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/configs/redux/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$redux$2f$slices$2f$clientSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/configs/redux/slices/clientSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$axios$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/configs/axios/index.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const setClientGlobalStateRedux = async ()=>{
    const authCode = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CODE_LOCAL_STORAGE_KEY"]);
    const telephone = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TELEPHONE_LOCAL_STORAGE_KEY"]);
    if (!authCode || !telephone) return;
    try {
        const client = (await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$auth$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthService"].checkClient({
            telephone,
            authCode
        })).data;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$redux$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storeRedux"].dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$redux$2f$slices$2f$clientSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setClient"])({
            id: client._id,
            authCode: client.authCode,
            createdAt: client.createdAt,
            messageTokens: client.messageTokens,
            telephone: client.telephone,
            updatedAt: client.createdAt
        }));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$axios$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthorizationMetadata"])(authCode, telephone);
    } catch  {
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CODE_LOCAL_STORAGE_KEY"]);
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TELEPHONE_LOCAL_STORAGE_KEY"]);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$redux$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storeRedux"].dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$redux$2f$slices$2f$clientSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setClient"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$redux$2f$slices$2f$clientSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialStateClientReduxState"]));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$axios$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthorizationMetadata"])('', '');
    }
};
const removePhoneFormatting = (telefone)=>{
    return telefone.replace(/\D/g, '');
};
}}),
"[project]/src/app/login/components/login-form/login-form.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LoginForm": (()=>LoginForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$helpers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/helpers/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$auth$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/auth/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-ssr] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-ssr] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$frutils$2e$js$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/frutils.js/dist/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$frutils$2e$js$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/frutils.js/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-qr-code/lib/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
const LoginForm = ()=>{
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [inputTelephoneText, setInputTelephoneText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [qrCode, setQrCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [pairingCode, setPairingCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [authCode, setAuthCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoadingGetCodes, setIsLoadingGetCodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingValidateConnection, setIsLoadingValidateConnection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasCodes = qrCode.length > 0 && pairingCode.length > 0;
    const getQrCode = async ()=>{
        const normalizedTelephone = `55${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$helpers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removePhoneFormatting"])(inputTelephoneText)}`;
        if (normalizedTelephone.length < 13) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Insira um número válido!');
            return;
        }
        try {
            setIsLoadingGetCodes(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$auth$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthService"].getQrCode(normalizedTelephone);
            setIsLoadingGetCodes(false);
            setQrCode(response.data.code);
            setPairingCode(response.data.pairingConde);
            setAuthCode(response.data.authCode);
        } catch  {
            setIsLoadingGetCodes(false);
        }
    };
    const checkClient = async ()=>{
        try {
            const normalizedTelephone = `55${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$helpers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removePhoneFormatting"])(inputTelephoneText)}`;
            setIsLoadingValidateConnection(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$auth$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthService"].checkClient({
                authCode,
                telephone: normalizedTelephone
            });
            setIsLoadingValidateConnection(false);
            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CODE_LOCAL_STORAGE_KEY"], authCode);
            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TELEPHONE_LOCAL_STORAGE_KEY"], normalizedTelephone);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$helpers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setClientGlobalStateRedux"])();
            navigate.push('/');
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('A conexão ainda não foi estabelecida!');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-5",
        children: !hasCodes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Insira o seu número do zap e comece a usar!"
                        }, void 0, false, {
                            fileName: "[project]/src/app/login/components/login-form/login-form.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                            value: inputTelephoneText,
                            onChange: (event)=>setInputTelephoneText((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$frutils$2e$js$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatTelephone"])(event.target.value)),
                            placeholder: "(00) 00000-0000"
                        }, void 0, false, {
                            fileName: "[project]/src/app/login/components/login-form/login-form.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/login/components/login-form/login-form.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    type: "primary",
                    color: "primary",
                    loading: isLoadingGetCodes,
                    onClick: getQrCode,
                    children: "Iniciar conexão"
                }, void 0, false, {
                    fileName: "[project]/src/app/login/components/login-form/login-form.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    style: {
                        height: '10rem',
                        width: '10rem'
                    },
                    value: qrCode
                }, void 0, false, {
                    fileName: "[project]/src/app/login/components/login-form/login-form.tsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    className: "w-full",
                    type: "primary",
                    color: "primary",
                    loading: isLoadingValidateConnection,
                    onClick: checkClient,
                    children: "Validar conexão"
                }, void 0, false, {
                    fileName: "[project]/src/app/login/components/login-form/login-form.tsx",
                    lineNumber: 87,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    className: "w-full",
                    onClick: ()=>window.location.reload(),
                    children: "Cancelar"
                }, void 0, false, {
                    fileName: "[project]/src/app/login/components/login-form/login-form.tsx",
                    lineNumber: 96,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/login/components/login-form/login-form.tsx",
            lineNumber: 82,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/login/components/login-form/login-form.tsx",
        lineNumber: 61,
        columnNumber: 10
    }, this);
};
}}),

};

//# sourceMappingURL=src_app_68b6c52a._.js.map