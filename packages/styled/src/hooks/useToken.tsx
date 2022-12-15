import { config } from '../nativebase.config';

export function useToken<T extends string | number>(
  property: string,
  token: T | T[],
  fallback?: T | T[]
) {
  const { tokens }: any = config;

  if (Array.isArray(token)) {
    let fallbackArr: T[] = [];
    if (fallback) {
      fallbackArr = Array.isArray(fallback) ? fallback : [fallback];
    }
    return token.map((currentToken, index) => {
      if (typeof currentToken === 'string' && currentToken?.startsWith('$')) {
        const originalToken = currentToken.slice(1);
        if (originalToken.includes('.')) {
          const [tokenA, tokenB] = originalToken.split('.');
          return tokens?.[property]?.[tokenA]?.[tokenB] ?? fallbackArr[index];
        } else {
          return tokens?.[property]?.[originalToken] ?? fallbackArr[index];
        }
      }
    });
  } else {
    if (typeof token === 'string' && token?.startsWith('$')) {
      const originalToken = token.slice(1);
      if (originalToken.includes('.')) {
        const [tokenA, tokenB] = originalToken.split('.');
        return tokens?.[property]?.[tokenA]?.[tokenB] ?? fallback ?? token;
      } else {
        return tokens?.[property]?.[originalToken] ?? fallback ?? token;
      }
    }
  }
}
