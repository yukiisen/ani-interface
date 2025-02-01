import { Pipe, PipeTransform } from '@angular/core';
import { TranslationsService } from '../../services/lang/translations.service';

@Pipe({
	name: 'translator',
	pure: false
})
export class TranslatorPipe implements PipeTransform {
	data: Record<string, string>;
	constructor (private translationData: TranslationsService) {
		this.data = translationData.data;
	}

	transform(value: string): string {
		return this.translationData.data[value] || value;
	}
}
