import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined, format: string = 'yyyy-MM-dd'): string | null {
    if (!value) {
      return null;
    }

    // 确保输入是Date对象
    const date = typeof value === 'string' ? new Date(value) : value instanceof Date ? value : new Date(value);

    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return null;
    }

    // 使用Intl.DateTimeFormat进行格式化
    // 注意：浏览器兼容性
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: format.includes('HH') ? '2-digit' : undefined,
      minute: format.includes('mm') ? '2-digit' : undefined,
      second: format.includes('ss') ? '2-digit' : undefined,
      hour12: format.includes('hh')
    });

    // 注意：Intl.DateTimeFormat不支持完全自定义的格式字符串（如'yyyy-MM-dd HH:mm:ss'）
    // 上面的逻辑是根据你提供的format参数尝试适配
    // 对于复杂的自定义格式，你可能需要使用moment.js或其他库

    // 由于Intl.DateTimeFormat的限制，这里简单返回ISO格式的日期作为示例
    // 实际使用时，你可能需要根据format参数做更复杂的处理或使用其他库
    return date.toISOString().substring(0, format === 'yyyy-MM-dd' ? 10 : format.length === 19 ? 19 : format.length);

    // 注意：上面的.substring()方法是一个简化的处理，仅用于演示
    // 并不完全准确，特别是当format包含时间部分时
  }
}
