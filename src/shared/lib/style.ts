import isNil from 'lodash/isNil';
// import { useRuntimeConfig } from 'nuxt/app';

interface Modifiers {
  [key: string]: boolean | string;
}

type BlockParam = string | Modifiers | boolean;

function useBlock(
  param1: BlockParam,
  param2: BlockParam,
  componentName: string,
): string {
  let className = null;
  let modifiers: Modifiers = {};

  if (typeof param1 === 'string') {
    className = param1;
  } else if (typeof param1 === 'object' && Object.keys(param1).length) {
    modifiers = param1;
  }

  if (param2 && typeof param2 === 'object' && Object.keys(param2).length) {
    modifiers = param2;
  }

  const initialClass = `${componentName}${className ? `__${className}` : ''}`;

  const resModifiers = Object.keys(modifiers).reduce((acc, key) => {
    if (typeof modifiers[key] === 'boolean' && modifiers[key]) {
      acc.push(`${initialClass}--${key}`);
    } else if (
      ['number', 'string'].includes(typeof modifiers[key]) &&
      !isNil(modifiers[key]) &&
      modifiers[key] !== 'undefined'
    ) {
      acc.push(`${initialClass}--${key}--${modifiers[key]}`);
    }

    return acc;
  }, [] as Array<string>);

  resModifiers.unshift(initialClass);

  return resModifiers.join(' ');
}

export function useStyle(componentName = '') {
  // темы пока нет
  // const config = useRuntimeConfig();
  // const currentTheme = config.public.theme ?? '';

  const b = (className: BlockParam = '', modifiers: BlockParam = {}) =>
    useBlock(className, modifiers, componentName);

  return {
    b,
  };
}
