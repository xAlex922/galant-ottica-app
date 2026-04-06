(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getServiceSupabase",
    ()=>getServiceSupabase,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://kwgilsskfsbkosvpyuse.supabase.co/");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3Z2lsc3NrZnNia29zdnB5dXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODY1MDMsImV4cCI6MjA4NTI2MjUwM30.j2US7w4rtFnoz5j8f8p9F5IzJZFfxN24mg8NwbYfotQ");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
});
function getServiceSupabase() {
    const serviceRoleKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const initAuth = {
                "AuthProvider.useEffect.initAuth": async ()=>{
                    try {
                        const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                        if (session?.user) {
                            await fetchUserProfile(session.user.id);
                        }
                    } catch (error) {
                        console.error('Error initializing auth:', error);
                    } finally{
                        setLoading(false);
                    }
                }
            }["AuthProvider.useEffect.initAuth"];
            initAuth();
            const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "AuthProvider.useEffect": async (event, session)=>{
                    if (session?.user) {
                        await fetchUserProfile(session.user.id);
                    } else {
                        setUser(null);
                    }
                    setLoading(false);
                }
            }["AuthProvider.useEffect"]);
            return ({
                "AuthProvider.useEffect": ()=>subscription.unsubscribe()
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    const fetchUserProfile = async (userId)=>{
        try {
            const { data: userData, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('*').eq('id', userId).maybeSingle();
            if (userData && !userError) {
                setUser({
                    id: userData.id,
                    email: userData.email,
                    nome: userData.nome,
                    cognome: userData.cognome,
                    telefono: userData.telefono,
                    codice_fiscale: userData.codice_fiscale,
                    indirizzo: userData.indirizzo,
                    cap: userData.cap,
                    provincia: userData.provincia,
                    data_nascita: userData.data_nascita,
                    ruolo: userData.ruolo
                });
                setLoading(false);
                return;
            }
            const { data: clienteData, error: clienteError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('clienti').select('*').eq('auth_user_id', userId).maybeSingle();
            if (clienteData && !clienteError) {
                setUser({
                    id: clienteData.id,
                    email: clienteData.email || '',
                    nome: clienteData.nome,
                    cognome: clienteData.cognome || '',
                    telefono: clienteData.telefono,
                    codice_fiscale: clienteData.codice_fiscale,
                    indirizzo: clienteData.indirizzo,
                    cap: clienteData.cap,
                    provincia: clienteData.provincia,
                    data_nascita: clienteData.data_nascita,
                    ruolo: 'customer'
                });
                setLoading(false);
                return;
            }
            console.warn('No profile found for user:', userId);
            setUser(null);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setUser(null);
            setLoading(false);
        }
    };
    const login = async (email, password)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
                email,
                password
            });
            if (error) throw error;
            if (data.user) {
                await fetchUserProfile(data.user.id);
            }
            return {
                success: true
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.message || 'Errore durante il login'
            };
        }
    };
    const register = async (registerData)=>{
        try {
            const { data: authData, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
                email: registerData.email,
                password: registerData.password,
                options: {
                    data: {
                        nome: registerData.nome,
                        cognome: registerData.cognome
                    }
                }
            });
            if (authError) throw authError;
            if (!authData.user) throw new Error('Registrazione fallita');
            const { error: clienteError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('clienti').insert({
                auth_user_id: authData.user.id,
                email: registerData.email,
                nome: registerData.nome,
                cognome: registerData.cognome,
                telefono: registerData.telefono
            });
            if (clienteError) {
                console.error('Error creating cliente:', clienteError);
            }
            return {
                success: true
            };
        } catch (error) {
            console.error('Register error:', error);
            return {
                success: false,
                error: error.message || 'Errore durante la registrazione'
            };
        }
    };
    const logout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    const updateProfile = async (data)=>{
        if (!user) {
            throw new Error('Utente non autenticato');
        }
        try {
            const updateData = {
                nome: data.nome,
                cognome: data.cognome,
                telefono: data.telefono || null,
                codice_fiscale: data.codice_fiscale || null,
                indirizzo: data.indirizzo || null,
                cap: data.cap || null,
                provincia: data.provincia || null,
                data_nascita: data.data_nascita || null
            };
            if (user.ruolo === 'customer') {
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('clienti').update(updateData).eq('id', user.id);
                if (error) {
                    console.error('Supabase error:', error);
                    throw new Error(error.message || 'Errore durante l\'aggiornamento');
                }
            } else {
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').update(updateData).eq('id', user.id);
                if (error) {
                    console.error('Supabase error:', error);
                    throw new Error(error.message || 'Errore durante l\'aggiornamento');
                }
            }
            // Aggiorna lo stato locale solo dopo il successo
            setUser({
                ...user,
                ...data
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            // Re-throw con messaggio user-friendly
            throw new Error(error.message || 'Errore durante l\'aggiornamento del profilo');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            isLoading: loading,
            login,
            register,
            logout,
            updateProfile
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth.tsx",
        lineNumber: 258,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "NiO5z6JIqzX62LS5UWDgIqbZYyY=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_81d2ea42._.js.map