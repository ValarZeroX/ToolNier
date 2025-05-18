// lib/utils/formatNumber.ts

/**
 * 格式化數字：保留最多指定小數位數，去除尾端無效 0。
 * @param value 數字或字串
 * @param decimals 最多保留幾位小數，預設 6
 */
export function formatNumber(value: number | string, decimals = 6): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
  
    if (isNaN(num)) return '';
  
    return parseFloat(num.toFixed(decimals)).toString();
  }
  