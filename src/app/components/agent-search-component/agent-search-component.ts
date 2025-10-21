import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import Agent from '../../models/Agent';
import { AgentService } from '../../services/agent-service';
import { AgentCardComponent } from '../agent-card-component/agent-card-component';
import { getTextFromField } from '../../commons/utils';
import { LoaderComponent } from '../loader-component/loader-component';
import { LoaderService } from '../../services/loader-service';

export default interface AgentSearchInterface 
{
  selectAgent(agent: Agent): void;
  cancelSearchAgent(): void;
}

@Component({
  selector: 'app-agent-search-component',
  imports: [AgentCardComponent],
  templateUrl: './agent-search-component.html',
  styleUrl: './agent-search-component.css'
})
export class AgentSearchComponent implements OnInit
{
  @Output() selectAction = new EventEmitter<Agent>();
  @Output() cancelAction = new EventEmitter<void>();

  constructor(public agentService: AgentService, private loaderService: LoaderService, private cdr: ChangeDetectorRef) 
  {
    console.log('AgentSearchComponent initialized');
    this.agentService.agents = [];
  }
  
  ngOnInit(): void 
  {
    console.log('AgentSearchComponent initialized');
  }

  onKeyup(event: any) 
  {
    console.log(event.target.value);
    if (event.key === 'Enter') 
    {
      const searchValue = (event.target as HTMLInputElement).value;
      if(searchValue.length > 1)
      {
        this.onSearch();
      }
    }
  }

  onChangeStatus(event: any) {
    this.onSearch();
  }

  onSearch()
  {
    let searchValue = getTextFromField('i_search_agent');
    let searchField = getTextFromField('s_agent_status_field');

    let json = 
    {
      search: searchValue,
      field: searchField
    };

    console.log('getClientBy called with Pre:', json);
    this.loaderService.show();
  
    this.agentService.getAgentsBy(json).subscribe({
      next: (data) => 
      {
        this.loaderService.hide();

        try
        {
          console.log('AgentsBy fetched successfully:', data);
          //this.checkFilter();
          this.agentService.fill(data.result);
  
          this.cdr.detectChanges();
        }catch(error)
        {
          console.error('Error processing client data:', error);
        }
      },
      error: (error) => 
      {
        this.loaderService.hide();
        console.error('Error fetching clients:', error);
      }
    }); 
  }

  triggerCancelAction()
  {
    this.cancelAction.emit();
  }

  triggerSelectAction(agent: Agent)
  {
    this.selectAction.emit(agent);
  }
}
