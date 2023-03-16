import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-mgt',
  templateUrl: './finance-mgt.component.html',
  styleUrls: ['./finance-mgt.component.scss']
})
export class FinanceMgtComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols":[
        {
          "description": "Bairaha Farms",
          "proName": "CSELK:BFL.N0000"
        },
        {
          "description": "Browns Investments",
          "proName": "CSELK:BIL.N0000"
        },
        {
          "description": "Renuka Agri Foods",
          "proName": "CSELK:RAL.N0000"
        },
        {
          "description": "Maskeliya Plantation",
          "proName": "CSELK:MASK.N0000"
        },
        {
          "description": "Hayleys PLC",
          "proName": "CSELK:HAYL.N0000"
        },
        {
          "description": "Agstar PLC",
          "proName": "CSELK:AGST.N0000"
        },
        {
          "description": "Jat Holdings",
          "proName": "CSELK:JAT.N0000"
        },
        {
          "description": "AGALAWATTE PLANTATIONS PLC",
          "proName": "CSELK:AGAL.N0000"
        },
        {
          "description": "CIC HOLDINGS PLC",
          "proName": "CSELK:CIC.X0000"
        },
        {
          "description": "TALAWAKELLE TEA ESTATES PLC",
          "proName": "CSELK:TPL.N0000"
        },
        {
          "description": "WATAWALA PLANTATIONS PLC",
          "proName": "CSELK:WATA.N0000"
        },
        {
          "description": "KELANI VALLEY PLANTATIONS PLC",
          "proName": "CSELK:KVAL.N0000"
        },
        {
          "description": "KOTAGALA PLANTATIONS PLC",
          "proName": "CSELK:KOTA.N0000"
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    });
    const tickerTapeElement = document.getElementById('tv-ticker-tape');
    if (tickerTapeElement) {
      tickerTapeElement.appendChild(script);
    }
  }

}
