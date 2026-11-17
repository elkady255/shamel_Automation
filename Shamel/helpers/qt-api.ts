import { request, type APIRequestContext } from '@playwright/test';

let ctxP: Promise<APIRequestContext> | undefined;
export function ctx(): Promise<APIRequestContext> {
  ctxP ??= (async () => {
    const c = await request.newContext({ baseURL: process.env.BASE_URL, timeout: 90_000 });
    const r = await c.post('/api/method/login', { form: { usr: process.env.APP_USERNAME!, pwd: process.env.APP_PASSWORD! } });
    if (!r.ok()) throw new Error('login failed ' + r.status());
    return c;
  })().catch((e) => { ctxP = undefined; throw e; });
  return ctxP;
}

export function serverMsg(body: any): string {
  try {
    if (body._server_messages) {
      const arr = JSON.parse(body._server_messages);
      return arr.map((m: string) => { try { return JSON.parse(m).message; } catch { return m; } }).join(' || ').replace(/<[^>]+>/g, '');
    }
    if (body.exception) return String(body.exception).replace(/<[^>]+>/g, '').slice(0, 300);
  } catch { /* ignore */ }
  return JSON.stringify(body).slice(0, 300);
}

export type Res = { ok: boolean; status: number; name?: string; msg: string; doc?: any };

export async function post(doctype: string, data: any): Promise<Res> {
  const c = await ctx();
  const r = await c.post(`/api/resource/${encodeURIComponent(doctype)}`, { data });
  const body = await r.json().catch(() => ({}));
  return r.ok() ? { ok: true, status: r.status(), name: body.data?.name, msg: 'OK', doc: body.data } : { ok: false, status: r.status(), msg: serverMsg(body) };
}
export async function put(doctype: string, name: string, data: any): Promise<Res> {
  const c = await ctx();
  const r = await c.put(`/api/resource/${encodeURIComponent(doctype)}/${encodeURIComponent(name)}`, { data });
  const body = await r.json().catch(() => ({}));
  return r.ok() ? { ok: true, status: r.status(), name, msg: 'OK', doc: body.data } : { ok: false, status: r.status(), msg: serverMsg(body) };
}
export async function method(m: string, args: any = {}): Promise<Res & { message?: any }> {
  const c = await ctx();
  const r = await c.post(`/api/method/${m}`, { data: args });
  const body = await r.json().catch(() => ({}));
  return r.ok() ? { ok: true, status: r.status(), msg: 'OK', message: body.message } : { ok: false, status: r.status(), msg: serverMsg(body) };
}
export async function get(doctype: string, name: string) {
  const c = await ctx();
  const r = await c.get(`/api/resource/${encodeURIComponent(doctype)}/${encodeURIComponent(name)}`);
  return (await r.json()).data;
}

export const BASE = () => ({
  quotation_to: 'Customer', party_name: 'CU-2026-00001', company: 'Ahmed Ebrahim CO.', order_type: 'Sales',
  custom_employee: 'HR-EMP-01418', custom_name_in_contract: 'PW QT',
  items: [{ item_code: 'IND182210', qty: 1, rate: 10200, warehouse: 'Stores - E' }],
});

