import React from 'react';
import Slider from '@material-ui/lab/Slider';
import Input from '@material-ui/core/Input'

export function SliderControl({min, max, value, onChange, label}) {

    function handleChange(v){
        if(v >= min && v <= max)
            onChange(v);
    }

    return <div className="slider-control">
        <h4>{label}</h4>
        <Slider
            min={min}
            max={max}
            step={1}
            value={parseInt(value)}
            onChange={(e, v) => onChange(v)}/>
        <Input value={value} onChange={(e) => handleChange(e.target.value)} type="number" />
    </div>
}