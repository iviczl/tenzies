import React from "react";

export default function Die(props) {
  const styles = { backgroundColor: props.isHeld ? '#59e391' : 'white' }

  return (
    <div className="die" onClick={props.toggle} style={styles}>
      {props.value}
    </div>
  )
}