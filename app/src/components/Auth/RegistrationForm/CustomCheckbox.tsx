
import styled from 'styled-components';
import { Checkbox } from '@nextui-org/react';

const CustomCheckbox = styled(({ checked, ...props }) => (
  <Checkbox {...props} />
))`
  span:nth-child(2) {
    background-color: white;
  }
  
  // .nextui-checkbox-box {
  //   background-color: ${(props) => (props.checked ? '#8DECB4' : '#FFF5E0')}; /* Custom colors */
  // }
  //
  // .nextui-checkbox-box:hover {
  //   background-color: ${(props) => (props.checked ? '#63C28B' : '#FFF0CC')}; /* Custom hover colors */
  // }
  //
  // .nextui-checkbox-box:active {
  //   background-color: ${(props) => (props.checked ? '#41B06E' : '#FFE4B3')}; /* Custom active colors */
  // }
`;

const App = () => {
  return (
    <CustomCheckbox required={true}></CustomCheckbox>
  );
};

export default App;
