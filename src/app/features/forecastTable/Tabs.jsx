import React from 'react';
import styled from 'styled-components';

const StyledTabs = styled.div.attrs({
})`
    opacity: 0.8;
`;

const Tabs = props =>
    <StyledTabs>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            {
                props.days.map((d, i) =>
                    <li className="nav-item" key={i}>
                        <a onClick={(e) => props.selectTab(e, i)}
                            style={{ opacity: 0.9 }} className={"nav-link font-weight-bold bg-white" + (i === props.activeContent ? ' active' : '')}
                            id={'dia' + i + '-tab'} data-toogle="tab" href={'#dia' + i} role="tab"
                            aria-controls={'dia' + i} aria-selected="false">
                            {i === 0 ? 'Hoy' : '+' + i}
                        </a>
                    </li>
                )
            }
        </ul>
    </StyledTabs>

export default Tabs;
