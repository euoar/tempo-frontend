import React from 'react';
import Header from './header/Header';
import Footer from './Footer';
import styled from 'styled-components';
import background from '../../assets/backrounds/1920.jpg';

const Page = styled.div.attrs({
  className: "Page",
})`
    main {
      padding-top: 112px;
      padding-bottom: 10px;
    }

    // Small devices (landscape phones, 576px and up)
    @media (max-width: 767px) {
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)
      ),
      url(${background});
    }

    @media (min-width: 768px) { 
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)
      ),
      url(${background});
      main {
        padding-top: 108px;
      }
     }

    // Medium devices (tablets, 768px and up)

    @media (min-width: 994px) { 
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)
      ),
      url(${background});
      main {
        padding-top: 74px;
      }
     }
    // Large devices (desktops, 992px and up)

    @media (min-width: 1200px) {
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)
      ),
      url(${background});
      main {
        padding-top: 74px;
      }
    }
    // Extra large devices (large desktops, 1200px and up)
    background-repeat: no-repeat;
    background-size: cover;
    
`;

const PageTemplate = (props) => {
  let mainDivHeight = props.children.length === 2 ? '100vh' : '100%';
  return (
    <Page aria-hidden="true">
      <Header style={{ oppacity: 0.9 }} />
      {props.children}
      <Footer linkHref="http://www.xente.mundo-r.com/arc/curriculum/index_dev.html" />
    </Page>
  )
}
export default PageTemplate;