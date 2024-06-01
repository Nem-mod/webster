import styled from 'styled-components';

const ClippingMask = styled.span`
  * {
    //color: red;
    background: rgb(20,30,70);
    background: linear-gradient(35deg, rgba(20,30,70,1) 0%, rgba(108,212,155,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 10px 0;
  }
`

const App = ({children}) => {
  return (
      <ClippingMask>
        {children}
      </ClippingMask>
    )
}

export default App