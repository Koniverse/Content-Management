import fetch from 'node-fetch';

export interface SubscanListData<V> {
  [k: string]: V[]
}

export interface SubscanCountData {
  count: number
}

export type SubscanListResponseData<T> = SubscanListData<T> & SubscanCountData

export interface SubscanResponse<T = any> {
  code: number,
  message: string,
  generated_at: number,
  data: T
}

export interface SubscanGetListInput<T> {
  key: string,
  network: string,
  api: string,
  method?: 'POST' | 'GET',
  data: T
}

export class Subscan {
  static async request<T>({network='polkadot', api, method='GET', data}: SubscanGetListInput<any>) {
    const url = `https://${network}.api.subscan.io/api/scan/${api}`;

    const rs = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return (await rs.json()) as SubscanResponse<T>

  }
  static async getList<V>(params: SubscanGetListInput<Record<string, string | number | Array<any>>> & {key: string}) {
    const row = 100;
    let page = 0;
    let fetched = 0;
    let count = 1

    const values: V[] = [];

    while (page * row < count) {
      params.data = {
        ...(params.data || {}),
        page,
        row
      };
      const res = await Subscan.request<SubscanListResponseData<V>>(params);
      if (res.code === 0) {
        const _d= res.data;
        count = _d.count;

        (_d[params.key] || []).forEach((v) => {
          values.push(v)
        })
      }

      page += 1;
    }

    return values;
  }
}
