import { New } from 'types/new';

export const getNews = async (): Promise<New[]> => {
  try {
    const news = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API +
        '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=5&populate=*&filters[type][$eq]=news'
    );
    const json = await news.json();
    return json.data;
  } catch (err) {
    const result = (err as Error).message;
    console.log(err);
    // TODO: Add logger
    throw Error(`Fetch News error ${result}`);
  }
};

export const getExchanges = async (locale: string): Promise<any> => {
  try {
    const exchanges = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API +
        '/api/exchanges?sort=order:asc&populate=*&locale=' +
        locale
    );
    const json = await exchanges.json();
    return json.data;
  } catch (err) {
    const result = (err as Error).message;
    console.log(err);
    // TODO: Add logger
    throw Error(`Fetch Exchanges error ${result}`);
  }
};

export const getErgoPrice = async (): Promise<number> => {
  try {
    const price = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ergo&vs_currencies=USD'
    );
    const json: any = await price.json();
    return json.ergo.usd;
  } catch (err) {
    const result = (err as Error).message;
    console.log(err);
    // TODO: Add logger
    throw Error(`Fetch getErgoPrice error ${result}`);
  }
};

export const getHashRate = async (): Promise<number> => {
  try {
    const hashRate = await fetch('https://api.ergoplatform.com/info/');
    const json = await hashRate.json();
    return json.hashRate;
  } catch (err) {
    const result = (err as Error).message;
    console.log(err);
    // TODO: Add logger
    throw Error(`Fetch getHashRate error ${result}`);
  }
};

export const getBlockInfo = async (): Promise<{
  currentBlockReward: number;
  difficulty: number;
}> => {
  try {
    const info = await fetch('https://api.ergoplatform.com/blocks');
    const json = await info.json();
    return {
      currentBlockReward: json.items[0].minerReward / 1000000000,
      difficulty: json.items[0].difficulty,
    };
  } catch (err) {
    const result = (err as Error).message;
    console.log(err);
    // TODO: Add logger
    throw Error(`Fetch getBlockInfo error ${result}`);
  }
};
