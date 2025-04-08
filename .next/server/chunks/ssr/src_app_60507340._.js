module.exports = {

"[project]/src/app/helpers/react-query.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s({
    "generateReactQuery": (()=>generateReactQuery),
    "generateReactQueryInfinityScroll": (()=>generateReactQueryInfinityScroll),
    "generateReactQueryMutation": (()=>generateReactQueryMutation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
;
const generateReactQuery = (queryKey, fn)=>{
    return (params, options)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
            ...options,
            queryKey: [
                queryKey,
                params
            ],
            queryFn: ()=>fn(params)
        });
    };
};
const generateReactQueryMutation = (queryKey, fn)=>{
    return (options)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
            ...options,
            mutationKey: [
                queryKey
            ],
            mutationFn: (event)=>fn(event)
        });
    };
};
const generateReactQueryInfinityScroll = (queryKey, fn)=>{
    return (params, options)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInfiniteQuery"])({
            ...options,
            queryKey: [
                queryKey,
                params
            ],
            queryFn: ({ pageParam })=>{
                const normalizedPageParam = pageParam;
                return fn(params, normalizedPageParam);
            },
            initialPageParam: undefined,
            getNextPageParam: ()=>null
        });
    };
};
}}),
"[project]/src/app/msgs/query-api/get-messages-history.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "KEY_GET_MESSAGES_HISTORY": (()=>KEY_GET_MESSAGES_HISTORY),
    "invalidateGetMessagesHistory": (()=>invalidateGetMessagesHistory),
    "useGetMessagesHistory": (()=>useGetMessagesHistory)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$axios$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/configs/axios/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$react$2d$query$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/configs/react-query/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$helpers$2f$react$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/helpers/react-query.ts [app-ssr] (ecmascript)");
;
;
;
const KEY_GET_MESSAGES_HISTORY = 'KEY_GET_MESSAGES_HISTORY';
const invalidateGetMessagesHistory = (clientId)=>{
    if (clientId) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$react$2d$query$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["queryClient"].invalidateQueries({
            queryKey: [
                KEY_GET_MESSAGES_HISTORY,
                clientId
            ]
        });
    } else {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$react$2d$query$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["queryClient"].invalidateQueries({
            queryKey: [
                KEY_GET_MESSAGES_HISTORY
            ]
        });
    }
};
const getMessagesHistory = async (clientId)=>{
    const path = `api/client/messages-history/${clientId}`;
    try {
        const response = (await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$axios$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HttpClientApi"].get(path)).data;
        return response;
    } catch  {
        throw new Error(path);
    }
};
const useGetMessagesHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$helpers$2f$react$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateReactQuery"])(KEY_GET_MESSAGES_HISTORY, getMessagesHistory);
}}),
"[project]/src/app/msgs/components/card-message/card-message.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CardMessage": (()=>CardMessage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-ssr] (ecmascript)");
;
;
const CardMessage = ({ message })=>{
    const stylesDivMessage = 'w-full flex';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `
    relative flex flex-col w-full h-fit border border-primaryLow rounded-md p-4 overflow-hidden
  `,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-0 p-2 bg-primaryLow rounded-bl-lg",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(message.createdAt).format('DD/MM/YYYY HH:mm')
            }, void 0, false, {
                fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
                lineNumber: 22,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${stylesDivMessage} justify-start`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1.5 w-fit rounded-lg max-w-[50%] max-md:max-w-[100%]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: message.user
                        }, void 0, false, {
                            fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
                            lineNumber: 27,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2 bg-gray-200 rounded-lg w-fit whitespace-pre-line",
                            children: message.receivedMessage.replace(`${message.user}:`, '')
                        }, void 0, false, {
                            fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
                            lineNumber: 28,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
                    lineNumber: 26,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
                lineNumber: 25,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${stylesDivMessage} justify-end`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1.5 w-fit items-end text-right max-w-[50%] max-md:max-w-[100%]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Resposta da IA"
                        }, void 0, false, {
                            fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
                            lineNumber: 33,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2 rounded-lg bg-gray-200 w-fit whitespace-pre-line",
                            children: message.replyMessage
                        }, void 0, false, {
                            fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
                            lineNumber: 34,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
                    lineNumber: 32,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
                lineNumber: 31,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/msgs/components/card-message/card-message.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, this);
};
}}),
"[project]/src/app/msgs/components/card-message/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
}}),
"[project]/src/app/msgs/components/card-message/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$card$2d$message$2f$card$2d$message$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/msgs/components/card-message/card-message.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$card$2d$message$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/app/msgs/components/card-message/index.ts [app-ssr] (ecmascript) <locals>");
}}),
"[project]/src/app/msgs/components/header-users/header-users.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeaderUsers": (()=>HeaderUsers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const HeaderUsers = ({ users, selectedUserTelephone, onChange })=>{
    const handleOnChange = (user)=>{
        if (selectedUserTelephone === user) {
            onChange('');
            return;
        }
        ;
        onChange(user);
    };
    return users.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex flex-col gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-500",
                children: "Filtro por usuários:"
            }, void 0, false, {
                fileName: "[project]/src/app/msgs/components/header-users/header-users.tsx",
                lineNumber: 26,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-gray-200 px-2 py-2 rounded-md min-h-fit gap-2 flex overflow-x-auto",
                children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `
                ${selectedUserTelephone === user.telephone ? 'border border-primary bg-primaryLow' : ''} 
                cursor-pointer text-[0.875rem] bg-gray-300 p-1 px-2 rounded-md text-gray-800
              `,
                        onClick: ()=>handleOnChange(user.telephone),
                        children: [
                            user.name,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-500",
                                children: user.telephone
                            }, void 0, false, {
                                fileName: "[project]/src/app/msgs/components/header-users/header-users.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this)
                        ]
                    }, user.telephone, true, {
                        fileName: "[project]/src/app/msgs/components/header-users/header-users.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/msgs/components/header-users/header-users.tsx",
                lineNumber: 27,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/msgs/components/header-users/header-users.tsx",
        lineNumber: 25,
        columnNumber: 29
    }, this) : null;
};
}}),
"[project]/src/app/msgs/components/header-users/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
}}),
"[project]/src/app/msgs/components/header-users/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$header$2d$users$2f$header$2d$users$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/msgs/components/header-users/header-users.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$header$2d$users$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/app/msgs/components/header-users/index.ts [app-ssr] (ecmascript) <locals>");
}}),
"[project]/src/app/msgs/components/content-msgs/content-msgs.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ContentMsgs": (()=>ContentMsgs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$redux$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/configs/redux/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$query$2d$api$2f$get$2d$messages$2d$history$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/msgs/query-api/get-messages-history.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$card$2d$message$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/msgs/components/card-message/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$card$2d$message$2f$card$2d$message$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/msgs/components/card-message/card-message.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$skeleton$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/skeleton/index.js [app-ssr] (ecmascript) <export default as Skeleton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$header$2d$users$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/msgs/components/header-users/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$header$2d$users$2f$header$2d$users$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/msgs/components/header-users/header-users.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const ContentMsgs = ()=>{
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$configs$2f$redux$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.client);
    const [selectedUserTelephoneFilter, setSelectedUserTelephoneFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const { data: dataGetMessagesHistory, isFetching: isFetchingGetMessagesHistory, isError: isErrorGetMessagesHistory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$query$2d$api$2f$get$2d$messages$2d$history$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetMessagesHistory"])(client.id, {
        retry: 2,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60
    });
    const normalizedDataGetMessagesHistory = selectedUserTelephoneFilter ? dataGetMessagesHistory?.data.filter((message)=>message.userTelephone === selectedUserTelephoneFilter) || [] : dataGetMessagesHistory?.data || [];
    const reversedMessages = [
        ...normalizedDataGetMessagesHistory
    ].reverse();
    const allUsersMap = new Map();
    normalizedDataGetMessagesHistory.forEach((message)=>{
        const key = `${message.user}-${message.userTelephone}`;
        allUsersMap.set(key, {
            name: message.user,
            telephone: message.userTelephone
        });
    });
    const allUsers = Array.from(allUsersMap.values());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 w-full shadow-lg p-2 rounded-b-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$header$2d$users$2f$header$2d$users$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderUsers"], {
                users: [
                    ...allUsers
                ],
                selectedUserTelephone: selectedUserTelephoneFilter,
                onChange: (user)=>setSelectedUserTelephoneFilter(user)
            }, void 0, false, {
                fileName: "[project]/src/app/msgs/components/content-msgs/content-msgs.tsx",
                lineNumber: 40,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    "Total de mensagens: ",
                    dataGetMessagesHistory?.data.length || 0
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/msgs/components/content-msgs/content-msgs.tsx",
                lineNumber: 45,
                columnNumber: 5
            }, this),
            isFetchingGetMessagesHistory ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$skeleton$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {}, void 0, false, {
                fileName: "[project]/src/app/msgs/components/content-msgs/content-msgs.tsx",
                lineNumber: 49,
                columnNumber: 38
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: isErrorGetMessagesHistory ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                    className: "max-w-[20rem]",
                    message: "Nenhuma mensagem encontrada!",
                    type: "error"
                }, void 0, false, {
                    fileName: "[project]/src/app/msgs/components/content-msgs/content-msgs.tsx",
                    lineNumber: 53,
                    columnNumber: 15
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: reversedMessages.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$msgs$2f$components$2f$card$2d$message$2f$card$2d$message$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardMessage"], {
                            message: message
                        }, index, false, {
                            fileName: "[project]/src/app/msgs/components/content-msgs/content-msgs.tsx",
                            lineNumber: 57,
                            columnNumber: 21
                        }, this))
                }, void 0, false)
            }, void 0, false)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/msgs/components/content-msgs/content-msgs.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, this);
};
}}),

};

//# sourceMappingURL=src_app_60507340._.js.map