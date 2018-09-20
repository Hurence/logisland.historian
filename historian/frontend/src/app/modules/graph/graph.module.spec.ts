import { GraphModule } from './graph.module';

describe('GraphModule', () => {
  let graphModule: GraphModule;

  beforeEach(() => {
    graphModule = new GraphModule();
  });

  it('should create an instance', () => {
    expect(graphModule).toBeTruthy();
  });
});
