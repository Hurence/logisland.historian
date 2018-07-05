import { SelectionModule } from './selection.module';

describe('SelectionModule', () => {
  let selectionModule: SelectionModule;

  beforeEach(() => {
    selectionModule = new SelectionModule();
  });

  it('should create an instance', () => {
    expect(selectionModule).toBeTruthy();
  });
});
