import { request, type APIRequestContext } from '@playwright/test';

let session: Promise<APIRequestContext> | undefined;

/** One logged-in API session per test worker, reused for every call (Frappe password login; no CSRF needed). */
function apiSession(): Promise<APIRequestContext> {
  session ??= (async () => {
    const ctx = await request.newContext({ baseURL: process.env.BASE_URL, timeout: 90_000 });
    const res = await ctx.post('/api/method/login', {
      form: { usr: process.env.APP_USERNAME!, pwd: process.env.APP_PASSWORD! },
    });
    if (!res.ok()) throw new Error(`API login failed: ${res.status()}`);
    return ctx;
  })().catch((e) => {
    session = undefined; // allow a retry on the next call
    throw e;
  });
  return session;
}

async function withSession<T>(fn: (ctx: APIRequestContext) => Promise<T>): Promise<T> {
  return fn(await apiSession());
}

export type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

async function json(res: Awaited<ReturnType<APIRequestContext['get']>>, what: string): Promise<Doc> {
  if (!res.ok()) throw new Error(`${what} failed: ${res.status()} ${(await res.text()).slice(0, 500)}`);
  return (await res.json()) as Doc;
}

/** Generic document helpers (Frappe REST). Test data is never deleted, by request. */
export const api = {
  async insert(doctype: string, data: Doc): Promise<Doc> {
    return withSession(async (ctx) =>
      (await json(await ctx.post(`/api/resource/${encodeURIComponent(doctype)}`, { data }), `insert ${doctype}`)).data,
    );
  },
  async get(doctype: string, name: string): Promise<Doc> {
    return withSession(async (ctx) =>
      (await json(await ctx.get(`/api/resource/${encodeURIComponent(doctype)}/${encodeURIComponent(name)}`), `get ${doctype}`)).data,
    );
  },
  async list(doctype: string, filters: unknown[] = [], fields: string[] = ['name'], limit = 100): Promise<Doc[]> {
    const q = `fields=${encodeURIComponent(JSON.stringify(fields))}&filters=${encodeURIComponent(JSON.stringify(filters))}&limit_page_length=${limit}`;
    return withSession(async (ctx) => (await json(await ctx.get(`/api/resource/${encodeURIComponent(doctype)}?${q}`), `list ${doctype}`)).data);
  },
  /** Call a whitelisted server method, e.g. frappe.client.submit or an ERPNext "make_*" mapper. */
  async call(method: string, args: Doc = {}): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    return withSession(async (ctx) => (await json(await ctx.post(`/api/method/${method}`, { data: args }), method)).message);
  },
  async submit(doc: Doc): Promise<Doc> {
    return this.call('frappe.client.submit', { doc });
  },
  async insertAndSubmit(doctype: string, data: Doc): Promise<Doc> {
    return this.submit(await this.insert(doctype, data));
  },
  /** Create the doc only if no record with that name/filter exists; returns the existing or new doc. */
  async ensure(doctype: string, filters: unknown[], data: Doc): Promise<Doc> {
    const [found] = await this.list(doctype, filters);
    return found ? this.get(doctype, found.name) : this.insert(doctype, data);
  },
};

export type ItemSeed = {
  item_name?: string;
  taxes?: { item_tax_template: string; minimum_net_rate?: number; maximum_net_rate?: number }[];
  item_defaults?: { company: string; default_warehouse: string }[];
  [field: string]: unknown;
};

/** The defaults the UI gives a new item in this environment: one company row and one tax row with 0 rates. */
export const UI_DEFAULTS: ItemSeed = {
  item_defaults: [{ company: 'Ahmed Ebrahim CO.', default_warehouse: 'Stores - E' }],
  taxes: [{ item_tax_template: 'Exempted - Warrqa', minimum_net_rate: 0, maximum_net_rate: 0 }],
};

export async function createItem(seed: ItemSeed = {}): Promise<string> {
  // is_stock_item: 0 matches the UI default (Maintain Stock off); the API would default it to 1
  const doc = await api.insert('Item', {
    item_name: `PW API ${Date.now()}`, item_group: 'Services', stock_uom: 'Unit', is_stock_item: 0, ...seed,
  });
  return doc.name;
}

export type ItemDoc = Record<string, unknown> & {
  item_defaults: { company: string; default_warehouse: string; default_price_list?: string }[];
  taxes: { item_tax_template: string; minimum_net_rate: number; maximum_net_rate: number }[];
};

export async function getItem(name: string): Promise<ItemDoc> {
  return (await api.get('Item', name)) as ItemDoc;
}

export async function deleteItem(name: string): Promise<void> {
  await withSession(async (ctx) => {
    await ctx.delete(`/api/resource/Item/${encodeURIComponent(name)}`);
  });
}
