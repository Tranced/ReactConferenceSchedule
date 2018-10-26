
import Tappable from 'react-tappable';
import React, { Component } from 'react';
import Popup from "reactjs-popup";
import Faker from "faker";
import './ScheduleContainer.css';
import upArrow from './img/up.png';
import downArrow from './img/down.png';

let schedule = [];


//instantiating sample data
for(let i = 0; i < 100; i++){
  schedule.push({
   title:Faker.lorem.text(),
   authors:Faker.company.companyName(),
   agency: Faker.finance.currencyCode().toString(),
   day: Faker.random.arrayElement(["Tuesday","Wednesday","Thursday"]),//Tuesday/Wednesday/Thursday
   time:"12:30-14:30",
   room:"Poster Exhibition Area",
   track: Faker.random.arrayElement(["A","B","C","D","E"])
  })
 }

const track = ({track}) => <div className = 'track'> {track} </div>;
const AbstractTitle = ({title,color}) => <div className = 'title' style = {{backgroundColor:color}}> {title} </div>;
const Author = ({author}) =>  <div className = 'author'> {author} </div>;
const Agency = ({agency}) => <div className = 'agency'> Agency: {agency} </div>;
const TimeAndPlace = ({time,place}) => <div className = 'time-and-place'> {time} in {place} </div>;

const tuesArray = schedule.filter(x => x.day.includes("Tuesday")).sort((a,b)=>a.agency.localeCompare(b.agency));
const wedArray = schedule.filter(x => x.day.includes("Wednesday")).sort((a,b)=>a.agency.localeCompare(b.agency));
const thursArray = schedule.filter(x => x.day.includes("Thursday")).sort((a,b)=>a.agency.localeCompare(b.agency));
const weekObj = {1:tuesArray, 2:wedArray, 3:thursArray};

const colorCode = { A: "blue", B: "red", C:"green", D:"yellow", E:"orange"};

const ScheduleCard = (props) => (
      <Popup trigger={
        <div className='Schedule-Card' style={{border:"solid "+props.color}}>
          <AbstractTitle style={{backgroundColor:props.color}} title = {props.title} color = {props.color}/>
          <Author author = {props.author} />
          <Agency agency = {props.agency} />
          <TimeAndPlace time = {props.time} place = {props.place} />
          <track track = {props.track}/>
        </div>
        } modal
        closeOnDocumentClick
      >
        <div className='Schedule-Card-Big'>
          <AbstractTitle className='Abstract-Title' title = {props.title} color = {props.color}/>
          <Author author = {props.author} />
          <Agency agency = {props.agency} />
          <TimeAndPlace time = {props.time} place = {props.place} />
          <track track = {props.track}/>
        </div>
      </Popup>
)



class ScheduleContainer extends Component{

  state = {
      page:1
  }
  

  setPage(id) {
    this.setState({page:id});
  }


  render() {
    let pageArray = weekObj[this.state.page];
    console.log(pageArray);
    // handling day codes
    let day = pageArray[0].day;
    // switch(day){
    //   case "43305":
    //     day = "Tuesday, July 24, 2018";
    //     break;
    //   case "43306":
    //     day = "Wednesday, July 25, 2018";
    //     break;
    //   default:
    //     break;
    // }


    // const colorCode = { A: "solid blue", B: "solid red", C:"solid green", D:"solid yellow", E:"solid orange"};

    return(
      <div className="page">


        <div className="Header">
          Some Academic Conference 2018 Abstracts


          <div>{day}</div>

          <Tappable className="scroll-up" onTap={()=>window.scrollBy(0,-document.getElementsByClassName("Schedule-Card")[0].clientHeight)}>
            <img src={upArrow}></img>
          </Tappable>

          <Tappable className="scroll-down" onTap={()=>window.scrollBy(0,document.getElementsByClassName("Schedule-Card")[0].clientHeight)}>
            <img src={downArrow}></img>
          </Tappable>


          <div className="Legend"> 

            <div>
              <label>   
              <div style={{backgroundColor:'blue', color:'black'}}> </div>
              </label>   
                    Track A: Basic and Translational Research 
            </div>

            <div>
              <label>   
              <div style={{backgroundColor:'red', color:'black'}}> </div>
              </label>   
                    Track B: Clinical Research
            </div>

            <div>
              <label>   
              <div style={{backgroundColor:'green', color:'black'}}>  </div>
              </label>   
                       Track C: Epidemiology and Prevention Research
            </div>


            <div>
              <label>   
              <div style={{backgroundColor:'yellow', color:'black'}}>  </div>
              </label>   
                       Track D: Social and political research, law, policy and human rights
            </div>


            <div>
              <label>   
              <div style={{backgroundColor:'orange', color:'black'}} ></div>
              </label>   
                        Track E: Implementation research, economics, systems and synergies with other health and development sectors
            </div>
          </div>
        </div>




        <div className="Schedule-Container">
          {
            pageArray.map(slide => <ScheduleCard 
                                                key = {slide.track+Math.random(0,5)}
                                                agency={slide.agency} 
                                                title={slide.title} 
                                                author={slide.authors} 
                                                time={slide.time} 
                                                place={slide.room} 
                                                track={slide.track}
                                                color={colorCode[slide.track.charAt(0)]}/>)
          }
        </div>  






        <ul>
          <button id="1" onClick={()=>this.setPage(1)}> 1 </button>
          <button id="2" onClick={()=>this.setPage(2)}> 2 </button>
          <button id="3" onClick={()=>this.setPage(3)}> 3 </button>
        </ul>

      </div>
    )
  }
}




export default ScheduleContainer;
