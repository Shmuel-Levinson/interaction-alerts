import * as React from 'react';

export function SearchItem(props: { onClick: Function, name: string }) {
 return (
  <div className={'search-item'} onClick={()=>props.onClick()}>
      {props.name}
  </div>
 );
};