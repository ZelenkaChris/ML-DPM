import React from 'react';
import {Form, FormGroup, FormText, Row, Col, Input, Label, Button} from 'reactstrap';
import $ from 'jquery';

import './App.css';


const jobs = ['Hero', 'Dark Knight', 'NightLord', 'Bow Master', 'Marksman'];

const jobSkills = {
  'Hero': {
    base: 'warrior',
    skills: ['w4'],
    weapon: ['2h Sword', '1h Sword'],
    baseMulti: 1,
    mastery: 0.6,
    classMulti: 1.9
  },
  'Dark Knight': {
    base: 'warrior',
    skills: ['w6', 'w7'],
    weapon: ['Spear', 'Polearm'],
    baseMulti: 2,
    mastery: 0.8,
    classMulti: 2
  },
  'Paladin': {
    base: 'warrior',
    skills: ['w1', 'w4'],
    weapon: ['2h Sword', '1h Sword', '2h Blunt', '1h Blunt'],
    baseMulti: 1,
    mastery: 0.6,
    classMulti: 1
  },
  'NightLord': {
    base: 'thief',
    skills: ['t1'],
    weapon: ['Claw'],
    baseMulti: 1,
    mastery: 0.6,
    classMulti: 1

  },
  'Shadower': {
    base: 'thief',

  },
  'Bow Master': {
    base: 'archer',
    skills: ['b1'],
    weapon: ['Bow'],
    baseMulti: 1,
    mastery: 0.9,
    classMulti: 1
  },
  'Marksman': {
    base: 'archer',
    skills: ['b2'],
    weapon: ['Crossbow'],
    baseMulti: 1,
    mastery: 0.9,
    classMulti: 1
  }
}

const skillTable = {
  w1: {
    name: 'Charged Blow [SW or M]',
    speed: {
      2: 600,
      3: 660,
      4: 720,
      5: 750,
      6: 810,
      7: 870,
      8: 900
    },
    multiplier: 3.5,
    hit: 1
  },
  w3: {
    name: ' Blast',
    speed: {
      2: 630,
      3: 690,
      4: 750,
      5: 810,
      6: 840,
      7: 900,
      8: 960
    },
    multiplier: 6,
    hit: 1
  },
  w4: {
    name: 'Brandish',
    speed: {
      2: 630,
      3: 690,
      4: 750,
      5: 810,
      6: 840,
      7: 900,
      8: 960
    },
    multiplier: 2.6,
    hit: 2
  },
  w5: {
    name: 'Sacrifice',
    speed: {
      2: 570,
      3: 630,
      4: 660,
      5: 720,
      6: 750,
      7: 810,
      8: 870,
      9: 900
    },
    multiplier: 3.5,
    hit: 1
  },
  w6: {
    name: 'Crusher',
    speed: {
      2: 810,
      3: 870,
      4: 930,
      5: 990,
      6: 1050,
      7: 1140,
      8: 1200,
      9: 1260
    },
    multiplier: 1.7,
    hit: 3
  },
  w7: {
    name: 'Fury',
    speed: {
      2: 600,
      3: 660,
      4: 720,
      5: 750,
      6: 810,
      7: 870,
      8: 900,
      9: 960
    },
    multiplier: 2.5,
    hit: 1
  },
  t1: {
    name: 'Triple Throw',
    speed: {
      2: 600,
      3: 660,
      4: 720,
      5: 750,
      6: 810
    },
    multiplier: 1.5,
    hit: 4.5
  },
  b1: {
    name: 'Hurricane',
    speed: {
      2: 120,
      3: 120,
      4: 120,
      5: 120,
      6: 120,
      7: 120,
      8: 120,
      9: 120
    },
    multiplier: 1,
    hit: 1
  },
  b2: {
    name: 'Strafe',
    speed: {
      2: 600,
      3: 660,
      4: 720,
      5: 750,
      6: 810
    },
    multiplier: .75,
    hit: 5
  }
}

const booster = [
  {name: 'None', value: 0},
  {name: 'Booster', value: 2},
  {name: 'SI', value: 4}
]

const weaponFormula = {
  "2h Sword": {
    primary: 4.6,
    secondary: 1
  },
  "1h Sword": {
    primary: 4,
    secondary: 1
  },
  "2h Blunt": {
    primary: 4.8,
    secondary: 1
  },
  "1h Blunt": {
    primary: 4.4,
    secondary: 1
  },
  "Spear": {
    primary: 5,
    secondary: 1
  },
  "Polearm": {
    primary: 5,
    secondary: 1
  },
  "Claw": {
    primary: 5,
    secondary: 0
  },
  "Bow": {
    primary: 3.4,
    secondary: 1
  },
  "Crossbow": {
    primary: 3.6,
    secondary: 1
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedJob: 'Hero',
      selectedSkill: 'w4',
      selectedSpeed: 6,
      selectedBooster: 2,
      selectedWeapon: '2h Sword',
      selectedSE: 0,
      selectedMW: 0,
      WA: 166,
      STR: 852,
      STRbonus: 78,
      STRmw: 0,
      STRtotal: 930,
      DEX: 4,
      DEXbonus: 96,
      DEXmw: 0,
      DEXtotal: 100,
      LUK: 4,
      LUKbonus: 0,
      LUKmw: 0,
      LUKtotal: 4
    };
  }

  jobOnChange = (e) => {
    this.setState(
      {
        selectedJob: e.target.value,
        selectedSkill: jobSkills[e.target.value].skills[0],
        selectedWeapon: jobSkills[e.target.value].weapon[0]
      }
    );
  }

  weaponOnChange = (e) => {
    this.setState(
      {
        selectedWeapon: e.target.value
      }
    );
  }

  boosterOnChange = (e) => {
    this.setState(
      {
        selectedBooster: e.target.value
      }
    );
  }

  seOnChange = (e) => {
    this.setState(
      {
        selectedSE: e.target.value
      }
    )
  }

  statsOnChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  mwOnChange = (e) => {
    const {STR, DEX, LUK} = this.state;
    const mwVal = e.target.value;

    let STRmw = Math.floor(parseInt(STR) * parseInt(mwVal) / 100);
    let DEXmw = Math.floor(parseInt(DEX) * parseInt(mwVal) / 100);
    let LUKmw = Math.floor(parseInt(LUK) * parseInt(mwVal) / 100);
    
    
    this.setState(
      {
        STRmw,
        DEXmw,
        LUKmw
      }
    )

  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  calculateDPM = (e) => {
    const {selectedJob, selectedSkill, selectedSpeed, selectedBooster, selectedWeapon, selectedSE, WA, STRtotal, DEXtotal, LUKtotal} = this.state;
    const {primary, secondary} = weaponFormula[selectedWeapon];
    const {base, baseMulti, mastery, classMulti} = jobSkills[selectedJob]
    let {speed, multiplier, hit} = skillTable[selectedSkill];

    const SEMulti = (parseInt(selectedSE) === 0) ? 0 : 1.4;
    const SECrit = (parseInt(selectedSE) === 0) ? 0 : 0.15;
    const NLCritMulti = 1;
    const NLCritChance = 0.5;
    const atkSpeed = Math.max(2, selectedSpeed - selectedBooster);

    let maxDamage, minDamage, avgDamage;
    let totalDamage;

    switch(base) {
      case 'warrior':
        maxDamage = (primary * STRtotal + secondary * DEXtotal) * WA / 100;
        minDamage = (primary * STRtotal * 0.9 * mastery + secondary * DEXtotal) * WA / 100;
        avgDamage = (maxDamage + minDamage) / 2;
        break;
      case 'thief':
        maxDamage = (primary * LUKtotal) * WA / 100;
        minDamage = (primary * LUKtotal / 2) * WA / 100;
        avgDamage = (maxDamage + minDamage) / 2;
        break;
      case 'archer':
        maxDamage = (primary * DEXtotal + secondary * STRtotal) * WA / 100;
        minDamage = (primary * DEXtotal * 0.9 * mastery + secondary * STRtotal) * WA / 100;
        avgDamage = (maxDamage + minDamage) / 2;
        break;
      default:
        break;
    }

    switch(selectedJob){
      case 'Hero':
        totalDamage = (multiplier * classMulti + SEMulti * SECrit) * hit;
        break;
      case 'NightLord':
        totalDamage = (multiplier + ((NLCritMulti + SEMulti) * (NLCritChance + SECrit))) * hit;
        break;
      case 'Dark Knight':
        totalDamage = (multiplier + (SEMulti * SECrit)) * classMulti * hit;
        break;
      case 'Bow Master':
        totalDamage = (multiplier + ((NLCritMulti + SEMulti) * (NLCritChance + SECrit))) * hit;
        break;
      case 'Marksman':
        totalDamage = (multiplier + ((NLCritMulti + SEMulti) * (NLCritChance + SECrit))) * hit;
        break;
      default:
        totalDamage = (1 + multiplier) * classMulti * baseMulti * hit;
        break;
    }

    
    console.log(selectedSkill, multiplier, totalDamage, classMulti, hit);
    
    let APM = 60000 / speed[atkSpeed];

    let maxDPM = maxDamage * totalDamage * APM;
    let avgDPM = avgDamage * totalDamage * APM;
    let minDPM = minDamage * totalDamage * APM;

    $('#DPM-max').text(this.numberWithCommas(Math.floor(maxDPM)));
    $('#DPM-avg').text(this.numberWithCommas(Math.floor(avgDPM)));
    $('#DPM-min').text(this.numberWithCommas(Math.floor(minDPM)));

  }

  render() {
    const {selectedWeapon, WA, 
      STR, STRbonus, STRmw, STRtotal, 
      DEX, DEXbonus, DEXmw, DEXtotal, 
      LUK, LUKbonus, LUKmw, LUKtotal} = this.state;

    let jobOption = jobs.map( (e, i) => {
      return <option key={i} value={e}>{e}</option>
    });

    let weaponOption = jobSkills[this.state.selectedJob].weapon.map( (e, i) => {

        return (selectedWeapon === e) ? 
          <option selected key={i} value={e}>{e}</option>:
          <option key={i} value={e}>{e}</option>;
    })

    let skillOption = jobSkills[this.state.selectedJob].skills.map( (e, i) => {
      return <option key={i} value={e}>{skillTable[e].name}</option>
    });

    let boosterOption = booster.map( (e,i) => {
      if (this.state.selectedBooster/2 === i) return <option selected key={i} value={e.value}>{e.name}</option>
      else return <option key={i} value={e.value}>{e.name}</option>
    })

    let newSTR = parseInt(STR) + parseInt(STRbonus) + parseInt(STRmw),
        newDEX = parseInt(DEX) + parseInt(DEXbonus) + parseInt(DEXmw),
        newLUK = parseInt(LUK) + parseInt(LUKbonus) + parseInt(LUKmw);

    if(STRtotal !== newSTR) {
      this.setState(
        {
          STRtotal: newSTR
        }
      )
    }
    if(DEXtotal !== newDEX) {
      this.setState(
        {
          DEXtotal: newDEX
        }
      )
    }
    if(LUKtotal !== newLUK) {
      this.setState(
        {
          LUKtotal: newLUK
        }
      )
    }


    return (
      <Form id='Calc-wrapper'>

        <FormGroup row id='job'>
          <Label sm={4}>Job:</Label>
          <Col sm={8}>
          <select className='custom-select' id='job-select' onChange={this.jobOnChange}>
            {jobOption}
          </select>
          </Col>
        </FormGroup>

        <FormGroup row id='weapon'>
          <Label sm={4}>Weapon Type:</Label>
          <Col sm={8}>
            <select className='custom-select' id='weapon-select' onChange={this.weaponOnChange}>
              {weaponOption}
            </select>
          </Col>
        </FormGroup>

        <FormGroup row id='weapon-attack'>
          <Label sm={4}>Weapon Attack:</Label>
          <Col sm={8}>
            <Input type='number' className="form-control" id='weapon-attack-text' value={WA} onChange={ (e) => this.setState({WA: e.target.value})}></Input>
          </Col>
        </FormGroup>

        <Form row id='stats-table'>
          <Label>Character Stats:</Label>
          <Row id='stats-header'>
            <Label sm={4}></Label>
            <Label sm={2}>Base</Label>
            <Label sm={4}>Bonus</Label>
            <Label sm={2}>Total</Label>
          </Row>
          <FormGroup row className="char-stats" id='str-block'>
            <Label sm={4}>STR:</Label>
            <Col sm={2}>
              <Input bsSize="sm" name='STR' type='number' className="form-control" id='STR-text-base' value={STR} onChange={this.statsOnChange}></Input>
            </Col>
            <Col sm={2}>
              <Input bsSize="sm" name='STRbonus' type='number' className="form-control" id='STR-text-bonus' value={STRbonus} onChange={ (e) => this.setState({STRbonus: e.target.value})}></Input>
            </Col>
            <Col sm={2}>
              <Input readOnly bsSize="sm" name='STRmw' className="form-control" id='STR-text-mw' value={STRmw} onChange={ (e) => this.setState({STRbonus: e.target.value})}></Input>
            </Col>
            <Col sm={2}>
              <Input readOnly bsSize="sm" className="form-control" id='STR-text-total' value={STRtotal} onChange={ (e) => this.setState({STRbonus: e.target.value})}></Input>
            </Col>
          </FormGroup>

          <FormGroup row className="char-stats" id='dex-block'>
            <Label sm={4}>DEX:</Label>
            <Col sm={2}>
              <Input bsSize="sm" name='DEX' type='number' className="form-control" id='DEX-text-base' value={DEX} onChange={ (e) => this.setState({DEX: e.target.value})}></Input>
            </Col>
            <Col sm={2}>
              <Input bsSize="sm" name='DEXbonus' type='number' className="form-control" id='DEX-text-bonus' value={DEXbonus} onChange={ (e) => this.setState({DEXbonus: e.target.value})}></Input>
            </Col>
            <Col sm={2}>
              <Input readOnly bsSize="sm" name='DEXmw' className="form-control" id='DEX-text-mw' value={DEXmw} onChange={ (e) => this.setState({DEXbonus: e.target.value})}></Input>
            </Col>
            <Col sm={2}>
              <Input readOnly bsSize="sm" className="form-control" id='DEX-text-total' value={DEXtotal} onChange={ (e) => this.setState({STRbonus: e.target.value})}></Input>
            </Col>
          </FormGroup>

          <FormGroup row className="char-stats" id='LUK-block'>
              <Label sm={4}>LUK:</Label>
              <Col sm={2}>
                <Input bsSize="sm" name='LUK' type='number' className="form-control" id='LUK-text-base' value={LUK} onChange={ (e) => this.setState({LUK: e.target.value})}></Input>
              </Col>
              <Col sm={2}>
                <Input bsSize="sm" name='LUKbonus' type='number' className="form-control" id='LUK-text-bonus' value={LUKbonus} onChange={ (e) => this.setState({LUKbonus: e.target.value})}></Input>
              </Col>
              <Col sm={2}>
                <Input readOnly bsSize="sm" name='LUKmw' className="form-control" id='LUK-text-mw' value={LUKmw} onChange={ (e) => this.setState({LUKbonus: e.target.value})}></Input>
              </Col>
              <Col sm={2}>
                <Input readOnly bsSize="sm" className="form-control" id='LUK-text-total' value={LUKtotal} onChange={ (e) => this.setState({STRbonus: e.target.value})}></Input>
            </Col>
          </FormGroup>

        </Form>

        <FormGroup row tag='fieldset' id='mw-radios'>
          <Label sm={4}>Maple Warrior:</Label>
          <Col sm={8}>
            <select className="custom-select" onChange={this.mwOnChange}>
              <option value="0">None</option>
              <option value="5">Maple Warrior 10</option>
              <option value="10">Maple Warrior 20</option>
              <option value="13">Maple Warrior 30</option>
            </select>
          </Col>
        </FormGroup>

        <FormGroup row id='weapon-speed'>
          <Label sm={4}>Weapon Speed:</Label>
          <Col sm={8}>
            <select className="custom-select" id="weapon-speed-select" onChange={ (e) => this.setState({selectedSpeed: e.target.value})}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6" selected>6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
          </Col>
        </FormGroup>

        <FormGroup row id='booster'>
          <Label sm={4}>Booster:</Label>
          <Col sm={8}>
            <select className="custom-select" id="booster-select" onChange={this.boosterOnChange}>
              {boosterOption}
            </select>
          </Col>
        </FormGroup>

        <FormGroup row id='SE'>
          <Label sm={4}>SE:</Label>
          <Col sm={8}>
            <select className="custom-select" id="SE-select" onChange={this.seOnChange}>
              <option value='0'>No</option>
              <option value='1'>Yes</option>
            </select>
          </Col>
        </FormGroup>

        <FormGroup row id='skill'>
          <Label sm={4}>Skill:</Label>
          <Col sm={8}>
            <select className="custom-select" id="skill-select">
                {skillOption}
            </select>
          </Col>
        </FormGroup>

        <FormGroup row id='calculate'>
          <Button onClick={this.calculateDPM}>Calculate</Button>
        </FormGroup>

        <div row id="totals">
          <div>
            <span>DPM MAX:</span>
            <span id='DPM-max'>
            </span>
          </div>
          <div>
            <span>DPM AVG:</span>
            <span id='DPM-avg'>
            </span>
          </div>
          <div>
            <span>DPM MIN:</span>
            <span id='DPM-min'>
            </span>
          </div>
        </div>

      </Form>
    );
  }
}

export default App;
