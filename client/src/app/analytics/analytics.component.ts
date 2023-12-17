import { Component, OnInit } from '@angular/core';
import {OrderService} from '../Services/order.service'
import { error } from 'console';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor(private OrderService:OrderService) { }

  ngOnInit(): void {

    this.OrderService.getIncomeByMonths(2023).subscribe((result:any)=> {
      console.log(JSON.stringify(result.object))
    },(error:any) =>{
      console.log(error);
    })
  }

  chartOptions = {
    title: {
      text: "Income per months for year 2023"
    },
    data: [{
      type: "line",
      dataPoints: [
        { label: "1",  y: 10  },
        { label: "2", y: 15  },
        { label: "3", y: 25  },
        { label: "4",  y: 30  },
        { label: "5",  y: 28  },
        { label: "6",  y: 28  },
        { label: "7",  y: 28  },
        { label: "8",  y: 28  },
        { label: "9",  y: 28  },
        { label: "10",  y: 28  },
        { label: "11",  y: 28  },
        { label: "12",  y: 28  },
      ]
    }]
			  
  };

}
