import { DraggableModule } from './draggable.module';

describe('DraggableModule', () => {
  let draggableModule: DraggableModule;

  beforeEach(() => {
    draggableModule = new DraggableModule();
  });

  it('should create an instance', () => {
    expect(draggableModule).toBeTruthy();
  });
});
