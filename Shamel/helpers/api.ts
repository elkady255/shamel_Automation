import { request, type APIRequestContext } from '@playwright/test';

/** Logged-in API session (Frappe password login; no CSRF token needed for API sessions). */
async function apiSession(): Promise<APIRequestContext> {
  const ctx = await request.newContext({ baseURL: process.env.BASE_URL });
  const res = await ctx.post('/api/method/login', {
    form: { usr: process.env.APP_USERNAME!, pwd: process.env.APP_PASSWORD! },
  });
  if (!res.ok()) throw new Error(`API login failed: ${res.status()}`);
  return ctx;
}

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
  const ctx = await apiSession();
  try {
    const res = await ctx.post('/api/resource/Item', {
      // is_stock_item: 0 matches the UI default (Maintain Stock off); the API would default it to 1
      data: { item_name: `PW API ${Date.now()}`, item_group: 'Services', stock_uom: 'Unit', is_stock_item: 0, ...seed },
    });
    if (!res.ok()) throw new Error(`Create item failed: ${res.status()} ${await res.text()}`);
    return (await res.json()).data.name;
  } finally {
    await ctx.dispose();
  }
}

export type ItemDoc = Record<string, unknown> & {
  item_defaults: { company: string; default_warehouse: string; default_price_list?: string }[];
  taxes: { item_tax_template: string; minimum_net_rate: number; maximum_net_rate: number }[];
};

export async function getItem(name: string): Promise<ItemDoc> {
  const ctx = await apiSession();
  try {
    return (await (await ctx.get(`/api/resource/Item/${encodeURIComponent(name)}`)).json()).data;
  } finally {
    await ctx.dispose();
  }
}

export async function deleteItem(name: string): Promise<void> {
  const ctx = await apiSession();
  try {
    await ctx.delete(`/api/resource/Item/${encodeURIComponent(name)}`);
  } finally {
    await ctx.dispose();
  }
}
