module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/supabase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getServiceSupabase",
    ()=>getServiceSupabase,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://kwgilsskfsbkosvpyuse.supabase.co/");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3Z2lsc3NrZnNia29zdnB5dXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODY1MDMsImV4cCI6MjA4NTI2MjUwM30.j2US7w4rtFnoz5j8f8p9F5IzJZFfxN24mg8NwbYfotQ");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
});
function getServiceSupabase() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateShipping",
    ()=>calculateShipping,
    "checkStockAvailability",
    ()=>checkStockAvailability,
    "createOrder",
    ()=>createOrder,
    "getBrands",
    ()=>getBrands,
    "getCategories",
    ()=>getCategories,
    "getOrderById",
    ()=>getOrderById,
    "getOrdersByCustomer",
    ()=>getOrdersByCustomer,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProducts",
    ()=>getProducts,
    "validateCoupon",
    ()=>validateCoupon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-route] (ecmascript)");
;
async function getProducts(filters) {
    try {
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('prodotti').select(`
        *,
        categoria:categorie(id, nome, slug),
        marca:marche(id, nome, slug, logo_url),
        varianti:prodotti_varianti(
          id, sku, potere, curva_base, diametro,
          cilindro, asse, giacenza, prezzo_override, attivo
        )
      `).eq('attivo', true).eq('visibile_storefront', true);
        if (filters?.categoria) {
            query = query.eq('categoria.slug', filters.categoria);
        }
        if (filters?.marca) {
            query = query.eq('marca.slug', filters.marca);
        }
        if (filters?.search) {
            query = query.ilike('nome', `%${filters.search}%`);
        }
        if (filters?.inEvidenza) {
            query = query.eq('in_evidenza', true);
        }
        const { data, error } = await query.order('ordine_visualizzazione');
        if (error) throw error;
        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            data: null,
            error: error.message
        };
    }
}
async function getProductBySlug(slug) {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('prodotti').select(`
        *,
        categoria:categorie(id, nome, slug),
        marca:marche(id, nome, slug, logo_url),
        varianti:prodotti_varianti(
          id, sku, potere, curva_base, diametro,
          cilindro, asse, addizione, giacenza, 
          giacenza_minima, prezzo_override, attivo
        )
      `).eq('slug', slug).eq('attivo', true).single();
        if (error) throw error;
        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return {
            data: null,
            error: error.message
        };
    }
}
async function getCategories() {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('categorie').select('*').eq('attiva', true).order('ordine');
        if (error) throw error;
        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return {
            data: null,
            error: error.message
        };
    }
}
async function getBrands() {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('marche').select('*').eq('attiva', true).order('ordine');
        if (error) throw error;
        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error fetching brands:', error);
        return {
            data: null,
            error: error.message
        };
    }
}
async function getOrdersByCustomer(clienteId) {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('ordini').select(`
        *,
        righe:ordini_righe(*)
      `).eq('cliente_id', clienteId).order('created_at', {
            ascending: false
        });
        if (error) throw error;
        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error fetching orders:', error);
        return {
            data: null,
            error: error.message
        };
    }
}
async function getOrderById(orderId) {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('ordini').select(`
        *,
        righe:ordini_righe(*),
        cliente:clienti(*)
      `).eq('id', orderId).single();
        if (error) throw error;
        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error fetching order:', error);
        return {
            data: null,
            error: error.message
        };
    }
}
async function createOrder(orderData) {
    try {
        const { data: ordine, error: ordineError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('ordini').insert({
            cliente_id: orderData.cliente_id,
            email_cliente: orderData.email_cliente,
            subtotale: orderData.subtotale,
            sconto_totale: orderData.sconto_totale || 0,
            costo_spedizione: orderData.costo_spedizione,
            totale: orderData.totale,
            totale_iva: orderData.totale_iva,
            indirizzo_spedizione: orderData.indirizzo_spedizione,
            indirizzo_fatturazione: orderData.indirizzo_fatturazione,
            metodo_pagamento: orderData.metodo_pagamento,
            metodo_spedizione: orderData.metodo_spedizione || 'standard',
            note_cliente: orderData.note_cliente,
            stato: 'ricevuto',
            stato_pagamento: 'pending'
        }).select().single();
        if (ordineError) throw ordineError;
        const righeData = orderData.righe.map((riga)=>({
                ordine_id: ordine.id,
                variante_id: riga.variante_id,
                prodotto_nome: riga.prodotto_nome,
                prodotto_sku: riga.prodotto_sku,
                quantita: riga.quantita,
                prezzo_unitario: riga.prezzo_unitario,
                parametri_ottici: riga.parametri_ottici,
                occhio: riga.occhio
            }));
        const { error: righeError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('ordini_righe').insert(righeData);
        if (righeError) throw righeError;
        return {
            data: ordine,
            error: null
        };
    } catch (error) {
        console.error('Error creating order:', error);
        return {
            data: null,
            error: error.message
        };
    }
}
async function checkStockAvailability(varianteId, quantita) {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].rpc('check_stock_disponibile', {
            p_variante_id: varianteId,
            p_quantita: quantita
        });
        if (error) throw error;
        return data === true;
    } catch (error) {
        console.error('Error checking stock:', error);
        return false;
    }
}
async function validateCoupon(codice, clienteId, subtotale) {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].rpc('valida_coupon', {
            p_codice: codice,
            p_cliente_id: clienteId,
            p_subtotale: subtotale
        });
        if (error) throw error;
        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error validating coupon:', error);
        return {
            data: null,
            error: error.message
        };
    }
}
async function calculateShipping(subtotale, cap, metodo) {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].rpc('calcola_spedizione', {
            p_subtotale: subtotale,
            p_cap: cap,
            p_metodo: metodo
        });
        if (error) throw error;
        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error calculating shipping:', error);
        return {
            data: null,
            error: error.message
        };
    }
}
}),
"[project]/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const filters = {
            categoria: searchParams.get('categoria') || undefined,
            marca: searchParams.get('marca') || undefined,
            search: searchParams.get('search') || undefined,
            inEvidenza: searchParams.get('inEvidenza') === 'true'
        };
        const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProducts"])(filters);
        if (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (error) {
        console.error('Products API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Failed to fetch products'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__12cebf31._.js.map