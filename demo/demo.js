"use strict";

import React from 'react';
import {
  ReactSVGPanZoom,
  Toolbar,
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT,
  fitToViewer
} from '../src/index';
import SnakeSVG from './svg/snake';
import If from './if';

export default class Demo extends React.Component {

  constructor(props) {
    super(props);
    let defaultValue = null;
    this.state = {
      value: defaultValue,
      tool: TOOL_NONE,
      x: 0,
      y: 0,
      detectAutoPan: true,
      detectWheel: true,
      toolbarPosition: POSITION_RIGHT
    };

    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.setValue(fitToViewer(this.Viewer.getValue()))
  }

  debugClick(event) {
    console.log('click', event);
    console.log('X', event.x);
    console.log('Y', event.y);
    console.log('scaleFactor', event.scaleFactor);
    console.log('translationX', event.translationX);
    console.log('translationY', event.translationY);
    console.log('SVGViewer', event.SVGViewer)
  }

  render() {
    return (
      <div style={{display: "flex"}}>
        <div style={{border: '1px solid black'}}>

          <ReactSVGPanZoom width={500} height={500} ref={Viewer => this.Viewer = Viewer}
                           value={this.state.value} tool={this.state.tool}
                           onChange={value => this.setState({value})}         //update state
                           toolbarPosition={this.state.toolbarPosition}

                           detectWheel={this.state.detectWheel}                            //detect zoom gestures
                           detectAutoPan={this.state.detectAutoPan}                        //perform auto pan

                           onClick={event => this.debugClick(event)}                       //display click on console
                           onMouseMove={event => this.setState({
                             x: event.x,
                             y: event.y
                           })} //display mouse position on window
                           onMouseUp={event => console.info('up', event.x, event.y)}       //print mouseup on console
                           onMouseDown={event => console.info('down', event.x, event.y)}   //print mousedown on console
          >
            {SnakeSVG}
          </ReactSVGPanZoom>
        </div>

        <div style={{paddingLeft: "15px"}}>
          <If condition={this.state.tool === TOOL_NONE}>
            <strong>SVG Mouse Position</strong> <br/>
            x: {Number(this.state.x).toFixed(4)} <br/>
            y: {Number(this.state.y).toFixed(4)}
            <hr/>
          </If>

          <div>
            <strong>Additional features</strong> <br/>
            <ul style={{padding: "0px", margin: "0px", listStyle: "none"}}>
              <li>
                <input type="checkbox" id="detectWheel" checked={this.state.detectWheel}
                       onChange={ event => this.setState({detectWheel: event.target.checked})}/>
                <label htmlFor="detectWheel"> detectWheel</label>
              </li>
              <li>
                <input type="checkbox" id="detectAutoPan" checked={this.state.detectAutoPan}
                       onChange={ event => this.setState({detectAutoPan: event.target.checked})}/>
                <label htmlFor="detectAutoPan"> detectAutoPan</label>
              </li>
            </ul>
            <hr/>
          </div>

          <div>
            <strong>Toolbar position</strong> <br/>
            <ul style={{padding: "0px", margin: "0px", listStyle: "none"}}>
              <li>
                <input type="radio" id="pos_none" checked={this.state.toolbarPosition === POSITION_NONE}
                       onChange={ event => this.setState({toolbarPosition: POSITION_NONE})}/>
                <label htmlFor="pos_none">none</label>
              </li>

              <li>
                <input type="radio" id="pos_top" checked={this.state.toolbarPosition === POSITION_TOP}
                       onChange={ event => this.setState({toolbarPosition: POSITION_TOP})}/>
                <label htmlFor="pos_top">top</label>
              </li>

              <li>
                <input type="radio" id="pos_right" checked={this.state.toolbarPosition === POSITION_RIGHT}
                       onChange={ event => this.setState({toolbarPosition: POSITION_RIGHT})}/>
                <label htmlFor="pos_right">right</label>
              </li>

              <li>
                <input type="radio" id="pos_bottom" checked={this.state.toolbarPosition === POSITION_BOTTOM}
                       onChange={ event => this.setState({toolbarPosition: POSITION_BOTTOM})}/>
                <label htmlFor="pos_bottom">bottom</label>
              </li>

              <li>
                <input type="radio" id="pos_left" checked={this.state.toolbarPosition === POSITION_LEFT}
                       onChange={ event => this.setState({toolbarPosition: POSITION_LEFT})}/>
                <label htmlFor="pos_left">left</label>
              </li>

            </ul>
            <hr/>
          </div>

          <strong>Programmatically perform actions</strong> <br/>
          <ul style={{padding: "0px", margin: "0px", listStyle: "none"}}>
            <li>
              <button onClick={event => this.Viewer.fitToViewer()}>Fit to viewer</button>
            </li>
            <li>
              <button onClick={event => this.Viewer.pan(0, -100)}>pan top</button>
              <button onClick={event => this.Viewer.pan(100, 0)}>pan right</button>
              <button onClick={event => this.Viewer.pan(0, 100)}>pan bottom</button>
              <button onClick={event => this.Viewer.pan(-100, 0)}>pan left</button>
            </li>
            <li>
              <button onClick={event => this.Viewer.fitSelection(725, 40, 200, 120)}>Zoom eyes</button>
            </li>
          </ul>
        </div>

      </div>
    )
  }
}
