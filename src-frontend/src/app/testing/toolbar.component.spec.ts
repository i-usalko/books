import { ToolbarComponent } from '../toolbar/toolbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {By} from '@angular/platform-browser';
describe('ToolbarComponent', () => {
    let component:ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [ToolbarComponent]
      })
      .compileComponents();
    }));
    beforeEach(() => { 
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
     });


    function sendInput(text: string, inputElement: HTMLInputElement) {
      inputElement.value = text;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      return fixture.whenStable();
    }
    
    it('Toolbar component should be created', () => {
      
      expect(component).toBeDefined();

    });

    it('Filters should be initialized to all true at startup', () => {
      expect(component.filterState).toEqual({text:true,rich:true,error:true});
    });

    it('EventEmitter emit given search query and filter state', () => {
        component.searchQuery = "testing search query"
        component.filterState = {
          text: false,
          rich: true,
          error: false
        };
        component.onSearchChanged.subscribe(g => {
            expect(g).toEqual(({
              search:"testing search query",
              filters: {
                text: false,
                rich: true,
                error: false
              }
            }));
         });
         component.fireEvent();
      });

      it('Toolbar should contain text: plain text ', () => {
        const toolbarElement: HTMLElement = fixture.nativeElement;
        expect(toolbarElement.textContent).toContain('Plain text');
      });
      

      it('Search input should bind to the searchQuery variable', done => {
        const searchInputText: string = 'MapReduce';
        const hostElement = fixture.nativeElement;
        const searchField: HTMLInputElement = hostElement.querySelector('input');
    
        sendInput(searchInputText, searchField).then(() => {
          expect(component.searchQuery).toEqual(searchInputText);
          done();
        });
   
      });
  });