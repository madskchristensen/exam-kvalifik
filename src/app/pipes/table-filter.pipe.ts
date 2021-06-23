import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {
    transform(items: any[], filterParam: string): any[] {
        return items.filter((item) =>
            item.title.toLowerCase().includes(filterParam.toLowerCase())
        );
    }
}
