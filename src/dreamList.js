import React from 'react';
import Masonry from 'react-masonry-component';
import AutoResponsive from 'autoresponsive-react';
import {Card, Button} from 'antd';
import DreamModal from './addDream';
import {findDreams} from './nebulas';

const masonryOptions = {
  transitionDuration: 0
};

class DreamList extends React.Component {
  state = {
    data:[],
  }
  constructor(props){
    super(props)
    this.fetch();
  }
  fetch = () => {
    findDreams((data) => {
      console.log(data);
      this.setState({data})
    })
  }
  clickItemHandle(e){

  }
  getAutoResponsiveProps() {
    return {
      itemMargin: 10,
      containerWidth: 941,
      itemClassName: 'item',
      gridWidth: 20,
      transitionDuration: '.5'
    };
  }
  render() {
    const {data} = this.state;
    const options = data.map((i) => {
      return <Card onClick={this.clickItemHandle} key={i.key} className="item" style={{width:200,height:150}} >
        <div style={{fontSize:12}}>时间:{i.time}</div>
        <div>{i.value}</div>
      </Card>;
    })
    return (
      <div style={{width:840,margin:'0 auto'}}>
      <div style={{margin:'10px 0px',textAlign:'right'}}>
        <DreamModal refresh={() => this.fetch()} />
      </div>
      <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
      {
       options
      }
    </AutoResponsive>
    </div>
      );
  }
}

export default DreamList;