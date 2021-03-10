import React from 'react';

import './CloudEffect.scss';


export default () => (

    //<div className="eclipse"></div>
    <>
        <div className="cloud-group cloud-one">
            <div className="cloud cloud-one" />
            <div className="cloud cloud-two" />
            <div className="cloud cloud-three" />
            <div className="cloud cloud-four" />
        </div>
        <div className="cloud-group cloud-two">
            <div className="cloud cloud-one" />
            <div className="cloud cloud-two" />
            <div className="cloud cloud-three" />
            <div className="cloud cloud-four" />
        </div>
        <svg id="clouds" width={0} height={0}>
            <filter id="cloud-filter-one">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={4} seed={2904} />
                <feDisplacementMap in="SourceGraphic" scale={170} />
            </filter>
            <filter id="cloud-filter-two">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={4} seed={8822} />
                <feDisplacementMap in="SourceGraphic" scale={180} />
            </filter>
            <filter id="cloud-filter-three">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={4} seed={7569} />
                <feDisplacementMap in="SourceGraphic" scale={170} />
            </filter>
            <filter id="cloud-filter-four">
                <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves={4} seed={8517} />
                <feDisplacementMap in="SourceGraphic" scale={100} />
            </filter>
        </svg>
    </>
);