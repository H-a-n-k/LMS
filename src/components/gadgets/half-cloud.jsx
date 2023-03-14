
const HalfCloud = ({top, left, right, height, transform, noLine, circleTop}) => { 
    return <div className="half-cloud" style={{ top: `${top}px`, right: `${right}px`, left:`${left}px`}}>
        <div className="cloud" style={{height: `${height}px`, width:`${height*2}px`, transform}}></div>
        {!noLine && 
            <>
                <div className="line"></div>
                <div className="circle" style={{top: `${circleTop}px`}}></div>
            </>
        }
    </div>
}

export default HalfCloud;