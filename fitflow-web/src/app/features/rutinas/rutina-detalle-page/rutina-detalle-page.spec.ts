import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { RutinaDetallePage } from './rutina-detalle-page';

describe('RutinaDetallePage', () => {
  const createComponent = async (id: string | null): Promise<ComponentFixture<RutinaDetallePage>> => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [RutinaDetallePage],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap(id === null ? {} : { id }) } } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(RutinaDetallePage);
    fixture.detectChanges();
    return fixture;
  };

  it('resuelve una rutina válida por su ID string', async () => {
    const fixture = await createComponent('routine-beginner-legs');
    expect(fixture.componentInstance.rutinaSeleccionada()?.id).toBe('routine-beginner-legs');
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Rutina Pierna Inicial');
  });

  it('muestra el estado no encontrado para un ID inexistente', async () => {
    const fixture = await createComponent('does-not-exist');
    expect(fixture.componentInstance.rutinaSeleccionada()).toBeUndefined();
    expect(fixture.nativeElement.textContent).toContain('Rutina no encontrada');
  });

  it('no selecciona la primera rutina cuando falta el ID', async () => {
    const fixture = await createComponent(null);
    expect(fixture.componentInstance.rutinaSeleccionada()).toBeUndefined();
    expect(fixture.nativeElement.textContent).not.toContain('Rutina Pierna Inicial');
  });
});
