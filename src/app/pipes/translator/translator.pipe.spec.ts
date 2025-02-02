import { TranslatorPipe } from './translator.pipe';
import { TranslationsService } from '../../services/lang/translations.service';

describe('TranslatorPipe', () => {
  it('create an instance', () => {
    const pipe = new TranslatorPipe(new TranslationsService);
    expect(pipe).toBeTruthy();
  });
});
