import React from 'react';
import './Controls.css';
import {SliderControl} from "./Controls/SliderControl";

export class Controls extends React.Component {
    render() {
        const {context, config, onChange} = this.props;
        const keys = Object.keys(context);
        return <div className="controlPanel">
            {keys.map(key =>{
                return <SliderControl className="slider-control"
                                      min={config[key].min}
                                      max={config[key].max} label={key}
                                      value={context[key]}
                                      onChange={(v) => onChange({[key]: parseInt(v)})}/>
            })
            }
        </div>
    }
}