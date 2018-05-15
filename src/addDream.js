import React from 'react';
import { Modal, Button, Input,notification } from 'antd';
import uuid from 'uuid';
import {addDream} from './nebulas';

const { TextArea } = Input;
class DreamModal extends React.Component{
  state={
    visible:false,
  }
  
  handleOk = () => {
    const {value} = this.state;
    if(!value){
      notification.error({
        message: '请说点什么吧～',
        description: '为梦想留言',
      });
    }else{
      const key = uuid();
      addDream(key,value,(a) => {
        if(this.props.refresh){
          this.props.refresh();
        }
        this.setState({visible:false})
      })
    }
  }
  handleCancel = () => {
    this.setState({visible:false})
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.setState({visible:true})}>为梦想留言</Button>
        <Modal
            title="为梦想留言"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="留言"
            cancelText="放弃"
          >
            <p><TextArea onChange={(e) => this.setState({value:e.target.value})} rows={4} placeholder="说点什么吧"/></p>
        </Modal>
      </div>
    )
  }
}

export default DreamModal;